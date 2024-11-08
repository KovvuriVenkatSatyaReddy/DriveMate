import { Drive } from "../models/drive.model.js";
import { User } from "../models/user.model.js";
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
    console.log(req.body.drive);
    

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
    try {
        const { driveId } = req.params;
        const userId = req.user._id;

        // Find the drive and check if it exists
        const drive = await Drive.findById(driveId);
        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }

        // Check if the user meets the eligibility criteria
        const user = await User.findById(userId);
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

        // Check if user’s branch is eligible
        if (!drive.eligibleBranches.includes(user.branch)) {
            return res.status(403).json({ message: 'Your branch is not eligible for this drive.' });
        }

        // Check if user meets the minimum CGPA requirement
        if (user.currentCGPA < drive.minCGPA) {
            return res.status(403).json({ message: `You do not meet the minimum CGPA requirement of ${drive.minCGPA}.` });
        }

        // Check if the drive has a specific gender requirement
        if (drive.gender !== 'All' && drive.gender !== user.gender) {
            return res.status(403).json({ message: `This drive is only open to ${drive.gender} candidates.` });
        }

        // If all checks pass, proceed to apply for the drive
        drive.appliedUsers.push({
            userId,
            applicationDate: new Date(),
            status: 'Applied',
        });
        await drive.save();

        // Update the User document to include this drive in appliedDrives
        user.appliedDrives.push({
            driveId,
            appliedAt: new Date(),
        });
        await user.save();

        res.status(200).json({ message: 'Successfully applied to the drive.' });
    } 
    catch (error) {
        console.error('Error applying to drive:', error);
        res.status(500).json({ message: 'An error occurred while applying to the drive.', error });
    }
};


export {addDrive,getDrives,applyToDrive};