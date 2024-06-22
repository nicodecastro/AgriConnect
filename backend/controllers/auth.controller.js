import { User, typeOfUser } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, email, password } = req.body    // still works even if no middle_name passed

        const user_type = typeOfUser.USER;      // hardcoded user_type (only user)

        const hashedPassword = await bcrypt.hash(password, 10)      // hash password using bcrypt

        const newUser = new User({
            first_name,
            middle_name,
            last_name,
            user_type,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        res.status(500).json({ error: 'Error signing up', message: err });
    }
}

const loginUser = async (req, res) => {
    const SECRET_KEY = 'agriconnect';
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ first_name: user.first_name, userId: user._id, user_type: user.user_type, email: user.email }, SECRET_KEY, { expiresIn: '2hr' });
        res.json({ message: 'Login successful', token: token });

    } catch (err) {
        res.status(500).json({ error: 'Error logging in', errorMessage: err });
    }
}

export { registerUser, loginUser }