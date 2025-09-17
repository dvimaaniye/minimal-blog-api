import type { SessionUser } from '@/types/session-user';

declare module 'express-serve-static-core' {
	interface Request {
		user?: SessionUser;
	}
}
