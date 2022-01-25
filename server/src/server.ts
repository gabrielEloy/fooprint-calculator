import express from 'express';
import emissionCategoryRouter from '@src/routes/emissionCategories';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '@src/swagger.json';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument),
);

app.use('/', emissionCategoryRouter);
