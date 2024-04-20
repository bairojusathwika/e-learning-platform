const express = require ("express");
const app = express();
const bodyParser = require('body-parser');
const router =require("./router/auth-router");
const sequelize = require(sequelize);

//get-read post-create update delete

const Course = courseSchema(sequelize, Sequelize.DataTypes);
const User = userSchema(sequelize, Sequelize.DataTypes);
const Enrolled = enrolledSchema(sequelize, Sequelize.DataTypes);


app.use(bodyParser.json());

app.use(express.json());
app.use("/api/auth",router);

// API endpoint for filtering by course_category
app.get('/course/filter', async (req, res) => {
    try {
      const { course_category } = req.query;
  
      // Query database to fetch filtered courses
      const result = await pool.query(
        'SELECT course_id, course_name, course_category FROM course WHERE course_category = Tech',
        [course_category]
      );
  
      // filtered courses as JSON response
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  // API endpoint for filtering by course_category
app.get('/courses/filter', async (req, res) => {
    try {
      const { course_category } = req.query;
  
      // Query database to fetch filtered courses
      const result = await pool.query(
        'SELECT course_id, course_name, course_category FROM course WHERE course_category = $1',
        [course_category]
      );
  
      //  filtered courses as JSON response
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  // API endpoint for filtering by course_difficulty
app.get('/course/course_difficulty', async (req, res) => {
    try {
      const { course_difficulty } = req.query;
  
      // Query database to fetch filtered courses
      const result = await pool.query(
        'SELECT course_id, course_name, course_category FROM course WHERE course_difficulty = Basic',
        [course_category]
      );
  
      //  filtered courses as JSON response
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API endpoint for filtering by course_instructor
app.get('/course/course_instructor', async (req, res) => {
    try {
      const { course_instructor } = req.query;
  
      // Query database to fetch filtered courses
      const result = await pool.query(
        'SELECT course_id, course_name, course_category FROM course WHERE course_instructor = ramdev',
        [course_category]
      );
  
      // Return the filtered courses as JSON response
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const PORT = 5432;

app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT}`);

});

