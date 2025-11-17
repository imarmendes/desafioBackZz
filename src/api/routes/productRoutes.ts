import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { productController } from "../controllers/ProductController";

const router = Router();

router.use(authMiddleware);

router.get("/", productController.list);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
