export const JWT_SERVICE = 'JWT SERVICE';
export interface IJWTService {
	validateToken(token: string): string;
}
