import { ICalculateEmissionQueryParams } from '@src/interfaces/ICalculateEmissionQueryParams';
import { ICustomError } from '@src/interfaces/ICustomError';
import { calculateEmissionsValidator } from '@src/middlewares/validators/emissions/calculateEmissions';
import {
  calculateEmission, getAllCategories, getCorrectionFactor, getEmissionFactor,
} from '@src/services/emissions';
import express, { Request } from 'express';

const router = express.Router();

router.get('/categories', (req, res) => {
  const categories = getAllCategories();

  return res.json(categories);
});

router.get('/calculate', calculateEmissionsValidator, (req: Request<{}, {}, {}, {}>, res) => {
  const {
    emissionSourceId,
    value,
  } = req.query as ICalculateEmissionQueryParams;

  try {
    const emissionFactor = getEmissionFactor(emissionSourceId);
    const correctionFactor = getCorrectionFactor(emissionSourceId);

    const emission = calculateEmission({ emissionValue: value, emissionFactor, correctionFactor });

    res.json({ emission, unit: 'kg CO2e/yr' });
  } catch (err) {
    const error = err as ICustomError;

    return res.status(error.code || 400).json({ message: error.message });
  }
});

export default router;
