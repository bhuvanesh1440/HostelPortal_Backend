const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const managementRoutes = require('./routes/managementRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hostelerRoutes = require('./routes/hostelerRoutes');
const hostlerCredentialsRoutes = require('./routes/hostlerCredentialsRoutes'); 
const requestsRoutes = require('./routes/requestsRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/management', managementRoutes);
app.use('/api', uploadRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/hostelers', hostelerRoutes);
app.use('/api/hostler-credentials', hostlerCredentialsRoutes); 
app.use('/api/requests', requestsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
