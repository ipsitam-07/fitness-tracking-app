import express from 'express';
import cors from 'cors';
import { connectDB } from './database/index.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
const PORT = process.env.PORT || 4000;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
})();
//# sourceMappingURL=index.js.map
