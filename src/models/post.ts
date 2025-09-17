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

export class Post extends Model<
	InferAttributes<Post>,
	InferCreationAttributes<Post>
> {
	declare id: CreationOptional<string>;
	declare author_id: ForeignKey<User['id']>;
	declare title: string;
	declare slug: string;
	declare content: string;
	declare thumbnail_url?: CreationOptional<string>;
	declare thumbnail_public_id?: CreationOptional<string>;
	declare status: CreationOptional<string>;
	declare published_at: CreationOptional<Date>;
}

Post.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		author_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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

		thumbnail_url: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		thumbnail_public_id: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		status: {
			type: DataTypes.ENUM('draft', 'published', 'archived'),
			allowNull: false,
			defaultValue: 'draft',
		},

		published_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize: sequelize,
		tableName: 'posts',
		underscored: true,
		indexes: [{ fields: ['author_id'] }, { fields: ['status'] }],
	},
);
