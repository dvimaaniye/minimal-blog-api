import { Sequelize } from 'sequelize';

import { env } from './env';

const sequelize = new Sequelize(env.POSTGRES_URI);

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('Database connection setup successfully!');
	} catch (error) {
		console.error('Unable to connect to the database', error);
	}
})();

export default sequelize;
