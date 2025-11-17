import { prisma } from "../../prisma/client";
import { hashPassword, comparePasswords } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const authService = {
  async register(name: string, email: string, password: string) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw { status: 400, message: "E-mail já cadastrado" };

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = generateToken({ id: user.id, name: user.name });

    return { token, user };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw { status: 400, message: "Usuário não encontrado" };

    const ok = await comparePasswords(password, user.password);
    if (!ok) throw { status: 400, message: "Senha incorreta" };

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { token, user };
  },
};
