# e-learning-platform

Description:
This project implements a comprehensive API for a Learning Management System (LMS) platform, facilitating user registration, profile management, course exploration, enrollment, and superadmin control.

🔧 Tech Stack
Node.js with Express.js – Server framework
PostgreSQL (via pg module) – Relational database
NeonDB – Hosted PostgreSQL (fully compatible with pg)
bcryptjs – Password hashing
dotenv – Environment variable management


Features:

User Management:
User registration with email uniqueness validation and password strength enforcement.

Course Management:
API endpoint to retrieve available courses with filtering capabilities (category, level, popularity).
Superadmin-only CRUD (Create, Read, Update, Delete) operations for courses.

User Enrollment:
API endpoint for users to enroll in courses of interest.
Validation to prevent duplicate enrollments.
User access to view their enrolled courses.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/bairojusathwika/e-learning-platform?utm_source=oss&utm_medium=github&utm_campaign=bairojusathwika%2Fe-learning-platform&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
