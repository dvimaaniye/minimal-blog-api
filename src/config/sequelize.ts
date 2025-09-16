import { Sequelize } from 'sequelize';

import { env } from './env';

const sequelize = new Sequelize(env.POSTGRES_URI);

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connection setup successfully!');

		try {
			await sequelize.sync();
		} catch (error) {
			console.log("Couldn't sync database", error);
		}
	} catch (error) {
		console.error('Unable to connect to the database', error);
	}
})();

export default sequelize;
