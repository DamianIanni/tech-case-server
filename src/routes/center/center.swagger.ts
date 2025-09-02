/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateCenterRequest:
 *       type: object
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
 * /api/center/center-actions/all-centers:
 *   get:
 *     summary: Get all centers
 *     tags: [Center]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all centers
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

/**
 * @swagger
 * /api/center/center-actions/me:
 *   get:
 *     summary: Get current center details
 *     tags: [Center]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current center details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Center'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Requires admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/center/center-actions/{center_id}:
 *   patch:
 *     summary: Update center details
 *     tags: [Center]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the center to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCenterRequest'
 *     responses:
 *       200:
 *         description: Center updated successfully
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
 *       403:
 *         description: Forbidden - Requires admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Center not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   
 *   delete:
 *     summary: Delete a center
 *     tags: [Center]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the center to delete
 *     responses:
 *       200:
 *         description: Center deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Requires admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Center not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
