export interface PutUserDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    permissionFlags: number;
}