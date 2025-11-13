// src/server.ts

const express = require('express');
const app: any = express();

// Define a porta. Lembre-se que em produção, a porta pode ser definida por variáveis de ambiente.
const PORT: number = 3000;

// Cria uma rota simples
app.get('/', (req: any, res: any) => {
    // Note que 'res.send' aceita objetos, arrays ou strings
    res.send({
        message: '🚀 Backend Node.js com TypeScript Rodando!',
        status: 200,
        timestamp: new Date().toISOString()
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor TS rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});

module.exports = app;