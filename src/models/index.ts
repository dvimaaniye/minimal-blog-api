import { OAuthAccount } from './oauth-account';
import { Post } from './post';
import { User } from './user';

User.hasMany(Post, { foreignKey: 'author_id' });
Post.belongsTo(User, { foreignKey: 'author_id' });

User.hasMany(OAuthAccount, { foreignKey: 'user_id' });
OAuthAccount.belongsTo(User, { foreignKey: 'user_id' });

export { User, Post, OAuthAccount };
