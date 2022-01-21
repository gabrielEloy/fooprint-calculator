import express from 'express';
import emissionCategoryRouter from '@src/routes/emissionCategories';

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

app.use('/emissions', emissionCategoryRouter);

app.listen(port, () => console.log(`server is listening on ${port}`));
