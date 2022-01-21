import { calculateEmission, getAllCategories } from '@src/services/emissions';
import express from 'express';

const router = express.Router();

router.get('/categories', (req, res) => {
  const categories = getAllCategories();

  return res.json(categories);
});

router.post('/calculate', (req, res) => {
  const {
    emissionSource,
    value,
  } = req.body;

  const emission = calculateEmission(emissionSource, value);

  res.json({ emission });
});

export default router;
