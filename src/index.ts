import express, { Request, Response } from "express";


import path from 'path';
import imageRoutes from './routes/imageRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


// Serve static files from the 'public' folder
app.use(express.static('public'));

// Use the image routes
app.use(imageRoutes);


// Use user routes
app.use(userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`View images at http://localhost:${PORT}/images`);
});
