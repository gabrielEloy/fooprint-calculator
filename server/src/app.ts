import express from 'express';
import emissionCategoryRouter from '@src/routes/emissionCategories';
import cors from 'cors';

const app = express();
const port = 4000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/emissions', emissionCategoryRouter);

app.listen(port, () => console.log(`server is listening on ${port}`));
