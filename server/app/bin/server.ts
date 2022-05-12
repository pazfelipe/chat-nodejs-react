import 'dotenv/config';
import app from '../source/app';

app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});