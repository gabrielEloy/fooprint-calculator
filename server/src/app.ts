import { app } from './server';

const port = 4000 || process.env.PORT;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
