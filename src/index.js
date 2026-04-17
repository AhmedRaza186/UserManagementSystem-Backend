const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./helperFunc/dbCon');
const dns = require('dns');
const authroutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');

// This is the most critical line for ENETUNREACH issues
dns.setDefaultResultOrder('ipv4first');

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authroutes)

app.get('/health', (req, res) => {
  res.json({
    status:true,
    message:'Server is working fine'
  })
});



// get all users
// get user by id
// update user by id
// delete user by id
app.use('/api/users',userRoutes)






app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port ' + process.env.PORT);
});