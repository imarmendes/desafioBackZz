import { prisma } from "../../prisma/client";

export const productService = {
  async list(userId: string) {
    return prisma.product.findMany({ where: { userId } });
  },

  async create(userId: string, name: string, price: number, description: string) {
    return prisma.product.create({
      data: { name, price, description, userId },
    });
  },

  async find(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  },

  async update(productId: string, userId: string, name: string, price: number, description: string) {
    return prisma.product.update({
      where: { id: productId },
      data: { name, price, description, userId },
    });
  },

  async remove(productId: string, userId: string) {
    return prisma.product.delete({
      where: { id: productId },
    });
  },
};
