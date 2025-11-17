import { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";

export const productController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const products = await productService.list(userId);
      res.json(products);
    } catch (e) {
      next(e);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price } = req.body;
      // @ts-ignore
      const userId = req.user.id;

      const product = await productService.create(userId, name, price);
      res.json(product);
    } catch (e) {
      next(e);
    }
  },

    async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;

      const product = await productService.find(productId);
      res.json(product);
    } catch (e) {
      next(e);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price } = req.body;
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;

      const product = await productService.update(id, userId, name, price);
      res.json(product);
    } catch (e) {
      next(e);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;

      await productService.remove(id, userId);
      res.json({ message: "Produto removido" });
    } catch (e) {
      next(e);
    }
  },
};
