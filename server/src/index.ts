import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import projectRoutes from './routes/software';
import kitRoutes from './routes/kits';
import archiveRoutes from './routes/archive';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'http://localhost:3000',
    'https://ihateyoue.netlify.app/',
    'https://ihateyoue.onrender.com', 
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.json());
app.use('/files', express.static(path.join(__dirname, '../files')));


app.get('/', (_req, res) => {
    res.send('🌌 portfolio backend running...');
});

app.use('/api/software', projectRoutes);
app.use('/api/kits', kitRoutes);
app.use('/api/archive', archiveRoutes);


app.listen(PORT, () => {
    console.log(`server vibin on http://localhost:${PORT}`);
});
