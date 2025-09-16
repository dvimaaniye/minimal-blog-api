import {
	type GoogleCallbackParameters,
	type Profile,
	Strategy,
	type VerifyCallback,
} from 'passport-google-oauth20';

import { OAuthAccount, User } from '@/models';

import { env } from './env';
import sequelize from './sequelize';

const googleStrategy = new Strategy(
	{
		clientID: env.GOOGLE_CLIENT_ID,
		clientSecret: env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/login/google/callback',
	},
	async function (
		_accessToken: string,
		_refreshToken: string,
		_params: GoogleCallbackParameters,
		profile: Profile,
		cb: VerifyCallback,
	) {
		let oauthAccount = await OAuthAccount.findOne({
			where: { provider_user_id: profile.id },
		});

		if (oauthAccount === null) {
			const results = await sequelize.transaction(async (transaction) => {
				const user = await User.create(
					{
						email: profile._json.email || profile.emails![0]!.value,
						email_verified:
							profile._json.email_verified ||
							profile.emails![0]!.verified ||
							false,
						name: profile.displayName,
						avatar_url: profile._json.picture,
					},
					{ transaction },
				);

				oauthAccount = await OAuthAccount.create(
					{
						provider: profile.provider,
						provider_user_id: profile.id,
						user_id: user.id,
					},
					{ transaction },
				);

				return user;
			});

			cb(null, results.dataValues);
			return;
		}

		const user = await User.findByPk(oauthAccount.user_id);

		if (!user) {
			cb(new Error("Couldn't find user"), false);
			return;
		}

		cb(null, user.dataValues);
	},
);

export default googleStrategy;
