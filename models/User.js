const Sequelize = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define('User', {
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_name: Sequelize.STRING,
    user_email: {
      type: Sequelize.STRING,
      unique: true,
    },
    user_password: Sequelize.STRING,
    user_image: Sequelize.STRING,
    total_orders: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    last_logged_in: Sequelize.DATE,
  });

  return User;
};
