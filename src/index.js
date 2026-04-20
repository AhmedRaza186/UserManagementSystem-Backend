import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './helperFunc/dbCon.js';
import dns from 'dns';
import authroutes from './routes/authroutes.js';
import userRoutes from './routes/userroutes.js';

try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch (e) {
    console.warn("DNS setServers failed, skipping...", e.message);
}

dotenv.config();

if (!process.env.MONGO_URI) {
    console.error("CRITICAL ERROR: MONGO_URI is not defined in environment variables!");
}

connectDB();

// 2. Allow your Netlify site to talk to your backend
app.use(cors({
    origin: 'https://usermanagementsystem26.netlify.app' 
}));

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

export default app;
