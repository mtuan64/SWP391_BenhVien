const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Employee = require('../../models/Employee');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please provide email, password, and name' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      status: 'active'
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, type: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        type: 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login for both User and Employee
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check in User collection
    let user = await User.findOne({ email });
    let userType = 'user';
    
    // If not found in User, check in Employee collection
    if (!user) {
      user = await Employee.findOne({ email });
      userType = 'employee';
    }

    // If no user found in either collection
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check user status
    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, type: userType },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Prepare response data
    const responseData = {
      id: user._id,
      email: user.email,
      name: user.name,
      type: userType
    };

    // Add employee-specific fields if user is an employee
    if (userType === 'employee') {
      responseData.role = user.role;
      responseData.department = user.department;
      responseData.specialization = user.specialization;
    }

    res.json({
      message: 'Login successful',
      token,
      user: responseData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};