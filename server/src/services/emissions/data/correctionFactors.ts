import { ICorrectionFactors } from '@src/interfaces/ICorrectionFactor';

export const correctionFactors: ICorrectionFactors[] = [{
  // the original unit is in kg/day. We need to convert it to kg/year
  // so, we multiply the emission value by 365
  id: 1,
  emissionSourceId: 6,
  value: 365,
},
// the original unit is in kg/week. We need to convert it to kg/year
// so, we multiply the emission value by 52
{
  id: 2,
  emissionSourceId: 5,
  value: 52,
},
// 1.09 is an upscaling value to compensate for the
// indirect emissions from the fuel production and a share
// of construction emissions for the vehicle.
{
  id: 3,
  emissionSourceId: 12,
  value: 1.09,
},
];

export const DEFAULT_CORRECTION_FACTOR = 1;
