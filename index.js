const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const connectDB = require('./config/db');

// Import routes
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hostelerRoutes = require('./routes/hostelerRoutes');
// const hostlerCredentialsRoutes = require('./routes/hostlerCredentialsRoutes'); 
const requestsRoutes = require('./routes/requestsRoutes');
const inchargeRoutes = require('./routes/inchargeRoutes')

const { default: mongoose } = require('mongoose');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// Routes

app.use('/ipload', uploadRoutes);
app.use('/admins', adminRoutes);
app.use('/student', hostelerRoutes);
// app.use('/hostler-login', hostlerCredentialsRoutes); 
app.use('/requests', requestsRoutes);
app.use('/incharge', inchargeRoutes); 

app.get("/",(req,res)=>{
    res.send("hello world")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

 const shutdown = async (signal)=>{
    console.log("closing.....")
    await mongoose.close();
    console.log("connect close")
    process.exit(0);
 }


process.on("SIGINT",()=>{shutdown("SIGINT")})
process.on("SIGTERM",()=>{shutdown("SIGTERM")})