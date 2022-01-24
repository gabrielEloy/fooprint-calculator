import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const calculateEmissionsValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = joi.object().keys({
    emissionSourceId: joi.number().required(),
    value: joi.number().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  req.query = { ...req.query, ...value };

  return next();
};
