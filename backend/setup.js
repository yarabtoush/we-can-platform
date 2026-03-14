const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      // Create admin user
      const adminUser = await User.create({
        phoneNumber: '0790000000', // Change this to a real admin phone
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin',
        isVerified: true,
        isApproved: true
      });

      console.log('Admin user created:', adminUser.phoneNumber);
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Database setup error:', error);
    process.exit(1);
  }
};

setupDatabase();