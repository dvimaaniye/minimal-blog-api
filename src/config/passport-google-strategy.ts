import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { OAuthAccount, User } from '@/models';

import { env } from './env';

passport.use(
	new GoogleStrategy(
		{
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/login/google/callback',
		},
		async function (accessToken, refreshToken, profile, cb) {
			console.log({ accessToken, refreshToken, profile });
			if (!profile.emails) {
				cb(new Error("Didn't get back your email"), false);
				return;
			}

			let oauthAccount = await OAuthAccount.findOne({
				where: { provider_user_id: profile._json.sub },
			});
			if (oauthAccount === null) {
				oauthAccount = await OAuthAccount.create({
					provider: profile.provider,
					provider_user_id: profile._json.sub,
				});
				cb(null, oauthAccount);
				return;
			}

			cb(null, oauthAccount);
		},
	),
);
