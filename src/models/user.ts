import { DataTypes, Model } from 'sequelize';

import sequelize from '@/config/sequelize';

export class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},

		email_verified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 100],
			},
		},

		avatar_url: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		role: {
			type: DataTypes.ENUM('user', 'admin'),
			allowNull: false,
			defaultValue: 'user',
		},
	},
	{
		sequelize: sequelize,
		tableName: 'users',
		underscored: true,
	},
);
