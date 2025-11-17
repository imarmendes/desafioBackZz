import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { log } from "console";

const app = express();
app.use(cors());
app.use(express.json());

/* ----------------------------- MOCK DATABASE ----------------------------- */

const users = [
  { id: "1", name: "Usuário Teste", email: "teste@teste.com", password: "123456" }
];

let products = [
  { id: "1", name: "Produto A", price: 10.5 },
  { id: "2", name: "Produto B", price: 20 }
];

/* ------------------------------- MIDDLEWARE ------------------------------- */

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== "fake-token-123" && token !== "fake-token-ABC") {
    return res.status(401).json({ message: "Token inválido" });
  }

  next();
}

/* -------------------------------- AUTH API -------------------------------- */

app.post("/auth/login", (req: Request, res: Response) => {
// app.get("/auth/login", (req: Request, res: Response) => {
  // const { email, password } = req.body;

  // const user = users.find(u => u.email === email && u.password === password);

  // if (!user) {
  //   return res.status(401).json({ message: "Credenciais inválidas" });
  // }
  
  // return res.json("inicial");
  console.log("äqio");
  

  return res.json({
    "token": "jwt-token-aqui",
    "user": {
      "id": "1",
      "name": "Imar Mendes",
      "email": "imar@email.com",
      "role": "user"
    }
  });
});

app.post("/auth/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = users.some(u => u.email === email);

  if (exists) {
    return res.status(400).json({ message: "E-mail já cadastrado" });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password
  };

  users.push(newUser);

  return res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: "fake-token-ABC"
  });
});

/* ------------------------------ PRODUCTS API ------------------------------ */

app.get("/", (req: Request, res: Response) => {
    console.log("rota barra");
  return res.json("inicialautomatico");
});

app.get("/products", (req: Request, res: Response) => {
  return res.json(products);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) return res.status(404).json({ message: "Produto não encontrado" });

  return res.json(product);
});

app.post("/products", (req: Request, res: Response) => {
  const { name, price } = req.body;

  const newProduct = {
    id: String(products.length + 1),
    name,
    price
  };

  products.push(newProduct);

  return res.status(201).json(newProduct);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const { name, price } = req.body;

  const product = products.find(p => p.id === req.params.id);

  if (!product) return res.status(404).json({ message: "Produto não encontrado" });

  product.name = name ?? product.name;
  product.price = price ?? product.price;

  return res.json(product);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const exists = products.some(p => p.id === req.params.id);

  if (!exists) return res.status(404).json({ message: "Produto não encontrado" });

  products = products.filter(p => p.id !== req.params.id);

  return res.json({ message: "Produto removido com sucesso" });
});

/* --------------------------------- SERVER --------------------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Mock server running at http://localhost:${PORT}`);
});
