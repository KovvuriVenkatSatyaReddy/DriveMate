import { Drive } from "../models/drive.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const getDrives = async (req, res) => {
    try {
        const drives = await Drive.find({});
    const availableDrives = drives.filter((drive) => drive.status === "available");
        const ongoingDrives = drives.filter((drive) => drive.status === "ongoing");
        const completedDrives = drives.filter((drive) => drive.status === "completed");
        res.status(200).json({
            availableDrives,
            ongoingDrives,
            completedDrives
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addDrive = async (req, res) => {
    const {
        companyName, 
        role, 
        description, 
        location, 
        ctc,
        eligibleBranches, 
        minCGPA,
        gender,
        selectionProcess, 
        deadline, 
        status,
        relatedDocuments, 
        instructions, 
        createdBy,
        updates
    } = req.body.drive;
    // console.log(req.body.drive);
    

    try {
        const newDrive = await Drive.create({
            companyName, 
            role, 
            description, 
            location, 
            ctc,
            eligibleBranches, 
            minCGPA,
            gender,
            selectionProcess, 
            deadline, 
            status,
            relatedDocuments, 
            instructions, 
            createdBy,
            updates
        });
        res.status(201).json({
            newDrive,
            message:"Drive added successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const applyToDrive = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { driveId } = req.params;
        const userId = req.user._id;

        // Find the drive and check if it exists
        const drive = await Drive.findById(driveId).session(session);
        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }

        // Find the user and check if they exist
        const user = await User.findById(userId).session(session);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is banned or already placed
        if (user.isBanned) {
            return res.status(403).json({ message: 'You are banned from applying.' });
        }
        if (user.isPlaced) {
            return res.status(403).json({ message: 'You are already placed and cannot apply to this drive.' });
        }

        // Check if the user has already applied to this drive
        const alreadyApplied = drive.appliedUsers.some(
            (application) => application.userId.toString() === userId.toString()
        );
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied to this drive.' });
        }
        
        const requiredFields = [
            'branch',
            'personalEmail',
            'currentCGPA',
            'name',
            'rollNo',
            // 'resume',
            'gender',
            'phoneNumber',
            'tenthPercentage',
            'twelfthPercentage'
        ];
        
        // Check if any required field is missing or empty
        const missingFields = requiredFields.filter(field => !user[field]);
        
        if (missingFields.length > 0) {
            return res.status(403).json({ 
                message: 'Set all user details to be eligible for this drive.', 
                missingFields 
            });
        }
        
        // Check eligibility based on branch, CGPA, and gender
        if (!drive.eligibleBranches.includes(user.branch)) {
            return res.status(403).json({ message: 'Your branch is not eligible for this drive.' });
        }
        if (user.currentCGPA < drive.minCGPA) {
            return res.status(403).json({ message: `You do not meet the minimum CGPA requirement of ${drive.minCGPA}.` });
        }
        if (drive.gender !== 'All' && drive.gender !== user.gender) {
            return res.status(403).json({ message: `This drive is only open to ${drive.gender} candidates.` });
        }

        // Add user information to appliedUsers array
        const details = {
            userId: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            rollNo: user.rollNo,
            resume: user.resume || null,  // Use a default or null if missing
            currentCGPA: user.currentCGPA,
            gender: user.gender,
            personalEmail: user.personalEmail || null,
            phoneNumber: user.phoneNumber || null,
            tenthPercentage: user.tenthPercentage || 0,  // Ensure non-empty value
            twelfthPercentage: user.twelfthPercentage || 0,
            applicationDate: new Date(),
            status: 'Applied'
        };

        drive.appliedUsers.push(details);

        console.log(`Applied users are: ${drive.appliedUsers}`);
        console.log(details);
        
        await drive.save({ session });
            
        // Update user's appliedDrives array
        user.appliedDrives.push({
            driveId,
            appliedAt: new Date(),
        });
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Successfully applied to the drive.' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error('Error applying to drive:', error);
        res.status(500).json({ message: 'An error occurred while applying to the drive.', error });
    }
};



export {addDrive,getDrives,applyToDrive};