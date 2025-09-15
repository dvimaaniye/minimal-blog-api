import Passport from 'passport';

export function passport() {
	return [Passport.initialize(), Passport.session()];
}
