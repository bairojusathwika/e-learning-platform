const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    course_instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_popularity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Course;
};



// course_name:"web development",
    // course_category:"tech",
    // level_of_difficulty:"basic",
    // course_price:"200",
    // course_instructor_name:"ramdev",
    // course_popularity:"most popular",