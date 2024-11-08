import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        admins: [],
        coordinators: [],
        students: [],
        bannedStudents: [],
    },
    reducers: {
        initialiseUsers: (state,action) => {
            state.admins = action.payload.admins;
            state.coordinators = action.payload.coordinators;
            state.students = action.payload.students;
            state.bannedStudents = action.payload.bannedStudents;
        },
        promoteToCoordinator: (state, action) => {
            const user = state.students.find((student) => student._id === action.payload._id);
            if (user) {
                state.coordinators.push(user);
                state.students = state.students.filter((student) => student._id !== action.payload._id);
            }
        },
        demoteToUser: (state, action) => {
            const user = state.coordinators.find((student) => student._id === action.payload._id);
            if (user) {
                state.students.push(user);
                state.coordinators = state.coordinators.filter((student) => student._id !== action.payload._id);
            }
        },
        banUser: (state, action) => {
            const userId = action.payload._id;
            console.log(userId);
            const coordinator = state.coordinators.find((user) => user._id === userId);
            const student = state.students.find((user) => user._id === userId);
            console.log(coordinator);
            console.log(student);
            
            if (coordinator) {
                state.bannedStudents.push(coordinator);
                state.coordinators = state.coordinators.filter((user) => user._id !== userId);
                console.log("user banned",state.coordinators,state.bannedStudents);
            } else if (student) {
                state.bannedStudents.push(student);
                state.students = state.students.filter((user) => user._id !== userId);
                console.log("user banned",state.students,state.bannedStudents);
            }
            
        },        
        unbanUser: (state, action) => {
            const userId = action.payload._id;
            console.log(userId);
            
            const bannedUser = state.bannedStudents.find((user) => user._id === userId);
            console.log(bannedUser);
            if (bannedUser) {
                state.students.push(bannedUser);
                state.bannedStudents = state.bannedStudents.filter((user) => user._id !== userId);
                console.log("user un banned");
            }
        },        
        markUserAsPlaced: (state, action) => {
            const userId = action.payload._id;
            state.coordinators.map((user) => {
                if(user._id === userId){
                    user.isPlaced = "true";
                }
            })
            state.students.map((user) => {
                if(user._id === userId){
                    user.isPlaced = "true";
                }
            })
        },
    },
});

export const { initialiseUsers, promoteToCoordinator, demoteToUser, banUser, markUserAsPlaced, unbanUser } = userSlice.actions;

export default userSlice.reducer;
