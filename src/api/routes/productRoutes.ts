import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { productController } from "../controllers/ProductController";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Lista produtos do usuário autenticado
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.list);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Cria um produto
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateInput'
 *     responses:
 *       '201':
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", productController.create);

/**
 * @openapi
 * /api/products/find:
 *   post:
 *     summary: Encontra um produto pelo ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       '200':
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/find", productController.find);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateInput'
 *     responses:
 *       '200':
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put("/:id", productController.update);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Produto removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", productController.remove);

export default router;
