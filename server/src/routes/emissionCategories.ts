import {
  calculateEmission, getAllCategories, getCorrectionFactor, getEmissionFactor,
} from '@src/services/emissions';
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

  const emissionFactor = getEmissionFactor(emissionSource);
  const correctionFactor = getCorrectionFactor(emissionSource);

  const emission = calculateEmission({ emissionValue: value, emissionFactor, correctionFactor });

  res.json({ emission });
});

export default router;
