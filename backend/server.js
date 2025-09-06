const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Portfolio Data Schema
const portfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    title: String,
    location: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    summary: String
  },
  experience: [{
    title: String,
    organization: String,
    date: String,
    location: String,
    achievements: [String]
  }],
  education: [{
    degree: String,
    institution: String,
    date: String,
    location: String,
    gpa: String,
    details: [String]
  }],
  projects: [{
    name: String,
    tech: String,
    link: String,
    description: String,
    achievements: [String]
  }],
  skills: {
    programming: [String],
    frameworks: [String],
    cloudDevOps: [String],
    uiux: [String],
    dataScience: [String],
    tools: [String],
    communication: [String],
    leadership: [String],
    other: [String]
  },
  certifications: [{
    name: String,
    issuer: String,
    year: String,
    score: String,
    description: String
  }],
  awards: [{
    title: String,
    event: String,
    year: String,
    description: String
  }]
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
// Get portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Save to database
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    
    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'muuushfique@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
    }
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Seed initial data
const seedData = async () => {
  try {
    const count = await Portfolio.countDocuments();
    if (count === 0) {
      const portfolioData = {
        personalInfo: {
          name: "S. M. MUSHFIQUR RAHMAN NAYEEM",
          title: "Computer Science Graduate & MERN Stack Developer",
          location: "Dhaka, Bangladesh",
          email: "muuushfique@gmail.com",
          phone: "+8801799905366",
          linkedin: "in/muuushfique",
          github: "github.com/muuushfique",
          summary: "A creative and solution-oriented Computer Science graduate with a passion for transforming ideas into impactful digital products. Skilled in developing robust mobile and web applications with attention to user experience, scalability, and maintainability."
        },
        experience: [
          {
            title: "General Secretary",
            organization: "BRAC University Monon",
            date: "February 2022 - Present",
            location: "Dhaka",
            achievements: [
              "Led the planning and execution of over five major music and dance events, increasing average event participation by 40%",
              "Managed and guided a team of 20+ students in logistics, promotions, and operations",
              "Secured sponsorships from four university partners, growing club revenue by 25%"
            ]
          }
          // ... add other experience entries
        ],
        // ... add other sections (education, projects, skills, etc.)
      };
      
      await Portfolio.create(portfolioData);
      console.log('Portfolio data seeded successfully');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

seedData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
