import { connectDB } from './database/index';
import appConfig from './config/app.config';
import app from './app';

(async () => {
  await connectDB();

  app.listen(appConfig.port, () => {
    console.log(`Backend running on port : ${appConfig.port}`);
  });
})();
