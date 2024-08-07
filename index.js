const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const connectDB = require('./config/db');

// Import routes
const uploadRoutes = require('./routes/uploadRoutes');

const adminRoutes = require('./routes/adminRoutes');
const adminLoginRoutes = require('./routes/adminLoginRoutes')

const hostelerRoutes = require('./routes/hostelerRoutes');
const hostlerCredentialsRoutes = require('./routes/hostlerCredentialsRoutes'); 
const requestsRoutes = require('./routes/requestsRoutes');

const inchargeRoutes = require('./routes/inchargeRoutes')
const InchargeLoginRoutes = require('./routes/inchargeLoginRoutes')

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

app.use('/upload', uploadRoutes);
// admins
app.use('/admins', adminRoutes);
app.use('/admin-auth',adminLoginRoutes)
// students
app.use('/student', hostelerRoutes);
app.use('/student-auth', hostlerCredentialsRoutes); 
app.use('/requests', requestsRoutes);

// incharges
app.use('/incharge', inchargeRoutes); 
app.use('/incharge-auth',InchargeLoginRoutes)

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
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