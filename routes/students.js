import express from 'express';

import { getStudents, getStudent, addStudent, updateStudent, deleteStudent} from '../controllers/students.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', addStudent);
router.get('/:id', getStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;