import express from 'express';
import mongoose from 'mongoose';

import StudentDetails from '../models/studentDetails.js';

const router = express.Router();

export const getStudents = async (req, res) => { 
    try {
        const studentDetails = await StudentDetails.find();
                    
        res.status(200).json(studentDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getStudent = async (req, res) => { 
    const { id } = req.params;

    try {
        const student = await StudentDetails.findById(id);
        
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addStudent = async (req, res) => {
    const { name, clas, section, fees, attendence, rollNo } = req.body;

    const newStudentDetails = new StudentDetails({ name, clas, section, fees, attendence, rollNo });
    const existingStudent = await StudentDetails.find({rollNo});

    if(existingStudent.length){
        return res.status(404).send(`Already present roll no : ${rollNo}`);
    }

    try {
        await newStudentDetails.save();

        res.status(201).json(newStudentDetails );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, clas, section, fees, attendence, rollNo } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No student with id no : ${id}`);

    const updatedDetails = { name, clas, section, fees, attendence, rollNo, _id: id };

    await StudentDetails.findByIdAndUpdate(id, updatedDetails, { new: true });

    res.json(updatedDetails);
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No student with id no : ${id}`);

    await StudentDetails.findByIdAndRemove(id);

    res.json({ message: "Student deleted successfully." });
}



export default router;