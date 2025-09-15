import { DataTypes, Model } from 'sequelize';

import sequelize from '@/config/sequelize';

export class OAuthAccount extends Model {}

OAuthAccount.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		provider: {
			type: DataTypes.ENUM('google'),
			allowNull: false,
		},

		provider_user_id: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		access_token: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		refresh_token: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		expires_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},

		linked_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: 'oauth_account',
		sequelize: sequelize,
		underscored: true,
		indexes: [
			{ fields: ['user_id'] },
			{ fields: ['provider_user_id'], unique: true },
		],
	},
);
