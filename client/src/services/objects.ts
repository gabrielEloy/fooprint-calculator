interface INumericObject {
    [key: string]: number;
}

export const sumObjectValues = (obj: INumericObject) => Object.values(obj).reduce((acc, curr) => acc + curr, 0);
