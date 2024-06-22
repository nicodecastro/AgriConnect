import { User, typeOfUser } from '../models/models.js';

export const getTotalUsers = async (req, res) => {
    try {
        const users = await User.find({ user_type: typeOfUser.USER }); //
        const totalUsers = users.length;
        res.status(200).json({ message: 'Total users retrieved successfully', totalUsers });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ user_type: typeOfUser.USER }); //
        res.status(200).send({ message: 'Users retrieved successfully', users, totalUsers: users.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getUser = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.find({ email: email });
        res.status(200).send({ message: 'Users retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, email } = req.body;
        await User.findOneAndUpdate({ email: email }, 
            {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
            }
        );
        res.status(200).send({ message: 'Personal information updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error});
    }
}