export interface SessionUser {
	id: string;
	email: string;
	email_verified: boolean;
	name: string;
	avatar_url: string;
	role: 'user' | 'admin';
	createdAt: string;
	updatedAt: string;
}
