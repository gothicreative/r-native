import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from '@clerk/express';


import {ENV} from './config/env.js';
import { connectDB } from './config/db.js';

import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';



const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get('/', (req, res) => {res.send('Hello World!');});

app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);


// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});


const startServer = async () => {
  try {
    await connectDB();
    
    // Normalize port and start the server
    const port = Number(ENV.PORT) || 3000;
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    // Handle async errors from the HTTP server
    server.on('error', (err) => {
      console.error('HTTP server error:', err);
      if (process.env.NODE_ENV !== 'test') process.exit(1);
    });
    // Return for testability / graceful shutdown
    return server;
  } catch (error) {    console.log("Error starting server:", error.message);
    process.exit(1);
  }
}
startServer();
