import { RedisStore } from 'connect-redis';
import { RequestHandler } from 'express';
import expressSession, { SessionOptions } from 'express-session';

import { env } from '@/config/env';
import { redisClient } from '@/config/redis';

const sessionOptions: SessionOptions = {
	name: 'sid',
	store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: env.NODE_ENV === 'production',
		httpOnly: true,
		sameSite: true,
		// maxAge: ms(env.SESSION_TTL),
	},
};

export function session(): RequestHandler {
	return expressSession(sessionOptions);
}
