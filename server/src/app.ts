import express from 'express';
import { a } from '@src/module/a';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send(`a: ${a}`);
});
app.listen(port, () => console.log(`server is listening on ${port}`));
