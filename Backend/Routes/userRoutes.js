import express from 'express'
import { createUser, deleteUser, loginUser, logoutUser } from '../Controllers/UserController.js';
import { User } from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import protect from './protect.js';
import { generateToken } from '../generateToken.js';

const router = express.Router();


// User Login Route
// POST Method
router.post('/', loginUser)

// Create new user
//POST Method
router.post('/new', createUser);

// Logout user
//POST Method
router.post('/logout', protect, logoutUser);

// Delete user
//POST Method
router.delete('/delete', protect, deleteUser);

export default router