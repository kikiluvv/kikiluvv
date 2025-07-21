import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import projectRoutes from './routes/software';
import kitRoutes from './routes/kits';
import galleryRoutes from './routes/gallery';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, '../files')));


app.get('/', (_req, res) => {
    res.send('🌌 portfolio backend running...');
});

app.use('/api/software', projectRoutes);
app.use('/api/kits', kitRoutes);
app.use('/api/gallery', galleryRoutes);


app.listen(PORT, () => {
    console.log(`server vibin on http://localhost:${PORT}`);
});
