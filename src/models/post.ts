import { DataTypes, Model } from 'sequelize';

import sequelize from '@/config/sequelize';

export class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		slug: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		thumbnail_url: DataTypes.TEXT,

		status: {
			type: DataTypes.ENUM('draft', 'published', 'archived'),
			allowNull: false,
			defaultValue: 'draft',
		},

		published_at: DataTypes.DATE,
	},
	{
		sequelize: sequelize,
		tableName: 'posts',
		underscored: true,
	},
);
