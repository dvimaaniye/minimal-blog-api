import {
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

import sequelize from '@/config/sequelize';

import { User } from './user';

export class OAuthAccount extends Model<
	InferAttributes<OAuthAccount>,
	InferCreationAttributes<OAuthAccount>
> {
	declare id: CreationOptional<string>;
	declare user_id: ForeignKey<User['id']>;
	declare provider: 'google';
	declare provider_user_id: string;
	declare linked_at: CreationOptional<Date>;
}

OAuthAccount.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},

		provider: {
			type: DataTypes.ENUM('google'),
			allowNull: false,
		},

		provider_user_id: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		linked_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
	},
	{
		tableName: 'oauth_accounts',
		sequelize: sequelize,
		underscored: true,
		indexes: [
			{ fields: ['user_id'] },
			{ fields: ['provider_user_id'], unique: true },
		],
	},
);
