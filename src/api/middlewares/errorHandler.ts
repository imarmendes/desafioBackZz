import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("🔥 ERRO:", err);

  return res.status(err.status || 500).json({
    message: err.message || "Erro interno no servidor",
  });
}
