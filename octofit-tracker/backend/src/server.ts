import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: db.readyState });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
