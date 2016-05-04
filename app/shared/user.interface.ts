export interface User {
    email: string;
    password: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
    unit: string;
}