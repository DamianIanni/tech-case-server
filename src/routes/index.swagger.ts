/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Account
 *     description: Account management endpoints
 *   - name: Center
 *     description: Medical center management
 *   - name: Patient
 *     description: Patient management
 *   - name: User
 *     description: User management within centers
 *   - name: Token
 *     description: Center selection and token management
 * 
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         code:
 *           type: string
 *           description: Error code
 *     Center:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Center ID
 *         name:
 *           type: string
 *           description: Center name
 *         address:
 *           type: string
 *           description: Center address
 *         phone:
 *           type: string
 *           description: Center phone number
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     CreateCenterRequest:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: Center name
 *         address:
 *           type: string
 *           description: Center address
 *         phone:
 *           type: string
 *           description: Center phone number
 */

/**
 * @swagger
 * /api/create-center:
 *   post:
 *     summary: Create a new medical center
 *     tags: [Center]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCenterRequest'
 *     responses:
 *       201:
 *         description: Center created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Center'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/center-selection:
 *   get:
 *     summary: Get available centers for selection
 *     tags: [Token]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of centers available for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Center'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
