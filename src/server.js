import express from 'express';
import cors from 'cors';

import contactRoutes from './routes/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { loger } from './middlewares/loger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(loger);

  app.use('/contacts', contactRoutes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
