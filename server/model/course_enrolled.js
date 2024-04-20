const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const enrolled = sequelize.define('Course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    course_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      course_difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    })
}

// Define foreign keys referencing user and course tables
Enrolled.belongsTo(User, { foreignKey: 'user_id' });
Enrolled.belongsTo(Course, { foreignKey: 'course_id' });