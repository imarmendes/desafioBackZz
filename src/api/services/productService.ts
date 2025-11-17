import { prisma } from "../../prisma/client";

export const productService = {
  async list(userId: string) {
    return prisma.product.findMany({ where: { userId } });
  },

  async create(userId: string, name: string, price: number) {
    return prisma.product.create({
      data: { name, price, userId },
    });
  },

  async update(productId: string, userId: string, name: string, price: number) {
    return prisma.product.update({
      where: { id: productId },
      data: { name, price, userId },
    });
  },

  async remove(productId: string, userId: string) {
    return prisma.product.delete({
      where: { id: productId },
    });
  },
};
