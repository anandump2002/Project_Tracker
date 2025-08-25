const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, role } = req.body; // role comes from frontend
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            username,
            password: hashedPassword,
            role: role || "user"  // default "user" if not given
        });
        res.status(201).json({ message: 'User Registered', user });
    } catch (err) {
        res.status(400).json({ error: 'Username already exists' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
        { userId: user._id, role: user.role },   // role added here
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token, role: user.role,username: user.username  });
};

