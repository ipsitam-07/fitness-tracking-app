import { User } from './User';
import { Workout } from './Workout';
import { Goal } from './Goals';

User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });

export { User, Workout, Goal };
