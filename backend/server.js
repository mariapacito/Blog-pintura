const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001; 

app.use(express.json());

async function main() {
  const usuariosExistentes = await prisma.usuario.count();
  
  if (usuariosExistentes === 0) {
    console.log('Banco vazio! Injetando dados iniciais...');
    
    await prisma.usuario.createMany({
      data: [
        { nome: 'Maria Clara', email: 'mariaclara@ifms.com' },
        { nome: 'maria', email: 'maria@ifms.com' },
        { nome: 'Professor', email: 'professor@ifms.com' }
      ],
      skipDuplicates: true,
    });
    
    console.log('Usuários criados com sucesso!');
  }
}

main()
  .catch((e) => {
    console.error('Erro ao rodar o seed:', e);
  });

app.get('/', (req, res) => {
  res.send('Servidor Express do CAPS - Blog de Pintura 🎨');
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários no banco de dados:", error); 
    res.status(500).json({ error: "Erro interno no servidor ao acessar o banco PostgreSQL" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});