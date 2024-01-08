const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const logger = require('../logger');

/**
 * @swagger
 *  components:
 *   examples:
 *    NoToken:
 *     summary: no JWT token
 *     value:
 *      message: "UnauthorizedError: No authorization token was found."
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Error: 
 *    type: object
 *    description: Error details
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: Parameters are mandatory
 *   
 *   UserSummary:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      example: fec9dd22-4731-4fa2-b681-04cfb0b55593
 *     username:
 *      type: string
 *      example: john
 *     surname:
 *      type: string
 *      example: doe
 *     token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVjNzM2OGE0ZDA3YzBhN2RlNzUxZCIsImlhdCI6MTY1NjE3ODMyMSwiZXhwIjoxNjU4NzcwMzIxfQ.s42jeam1abBs_9whK2Ywpud8dN22_FPXWeylhsFti4Y
 *   
 *   UserMe:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      example: fec9dd22-4731-4fa2-b681-04cfb0b55593
 *     name:
 *      type: string
 *      example: john
 *     surname:
 *      type: string
 *      example: doe
 *    
 *
 *   AddUserSchema:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: john1
 *     surname:
 *      type: string
 *      example: dekleva
 *     password:
 *      type: string
 *      example: 123123
 * 
 *    required:
 *     - username
 *     - surname
 *     - password  
 * 
 *   LoginUserSchema:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: john1
 *     password:
 *      type: string
 *      example: 123123
 * 
 *    required:
 *     - username
 *     - password
 * 
*/

/**
 * @swagger
 *  /live:
 *   get:
 *    summary: Liveness Check
 *    tags: [Health and metrics]
 *    responses:
 *     "200":
 *      description: liveness check data
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /ready:
 *   get:
 *    summary: Readiness Check
 *    tags: [Health and metrics]
 *    responses:
 *     "200":
 *      description: Readiness check data
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /metrics:
 *   get:
 *    summary: Metrics
 *    description: Database and custom metrics
 *    tags: [Health and metrics]
 *    responses:
 *     "200":
 *      description: Metrics data
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /procMetrics:
 *   get:
 *    summary: Proc metrics
 *    description: Process and environment related metrics
 *    tags: [Health and metrics]
 *    responses:
 *     "200":
 *      description: Metrics data
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /auth/register:
 *   post:
 *    summary: Register a new user
 *    tags: [Users]
 *    requestBody:
 *     description: User data
 *     required: true 
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/AddUserSchema"
 *    responses:
 *     "201":
 *      description: Successful request body containing details of a user
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /auth/login:
 *   post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *     description: User data
 *     required: true 
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/LoginUserSchema"
 *    responses:
 *     "200":
 *      description: Successful login
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Invalid credentials
 */

/**
 * @swagger
 *  /auth/users/me:
 *   get:
 *    summary: Get current user
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Successful request, user returned in response body
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserMe"
 *     
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 *    
 */

/**
 * @swagger
 *  /auth/users/{userId}:
 *   delete:
 *    summary: Delete user
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema: 
 *          type: string
 *    tags: [Users]
 *    responses:
 *     "204":
 *      description: Successful request, user id returned in response body
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserMe"
 *     
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 * 
 */

/**
 * @swagger
 *  /auth/users/{userId}:
 *   patch:
 *    summary: Update user
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema: 
 *          type: string
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            surname:
 *              type: string
 *    tags: [Users]
 *    responses:
 *     "201":
 *      description: Successful request, user returned in response body
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserMe"
 *     
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 *    
*/

/**
 * @swagger
 *  /auth/users:
 *   get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *     "200":
 *      description: A list of all users
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserMe"
 *    
*/

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

User.sync().then(() => {
    logger.log({ level: 'info', message: 'User model synced!' });
});

module.exports = User;
