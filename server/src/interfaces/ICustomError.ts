export interface ICustomError extends Error {
    message: string;
    code?: number;
}
