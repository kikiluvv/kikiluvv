import express from 'express';
import cors, { CorsOptionsDelegate, CorsRequest } from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import projectRoutes from './routes/software';
import kitRoutes from './routes/kits';
import archiveRoutes from './routes/archive';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins: string[] = [
    'http://localhost:3000',
    'https://ihateyoue.netlify.app',
    'https://ihateyoue.onrender.com',
];

const corsOptions: CorsOptionsDelegate<CorsRequest> = (
    req: CorsRequest,
    callback: (err: Error | null, options?: cors.CorsOptions) => void
) => {
    const origin = req.headers.origin;
    console.log('🌐 Incoming origin:', origin);

    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, { origin: true, credentials: true });
    } else {
        callback(new Error('❌ Not allowed by CORS'), { origin: false });
    }
};

app.use(cors(corsOptions));
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
