// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Usuario {
  id Int @id @default(autoincrement())
  nome String
  email String @unique
  senha String
  telefone String
  celular String
  cnpj_cpf String
  administrador Boolean
  agendamentos Agendamento[]

  @@map("usuarios")
}

model Profissional {
  id Int @id @default(autoincrement())
  nome String
  descricao String
  imagemURL String
  agendamentos Agendamento[]

  @@map("profissionais")
}

model Servico {
  id Int @id @default(autoincrement())
  nome String
  descricao String
  qtdSlots Int
  
  agendamentos Agendamento[]

  @@map("servicos")
}

model Agendamento {
  
  id Int @id @default(autoincrement())
  data DateTime
  usuario Usuario @relation(fields: [usuarioId], references: [id])
  usuarioId Int
  
  profissional Profissional @relation(fields: [profissionalId], references: [id])
  profissionalId Int
  
  servicos Servico[] 
  
  @@map("agendamentos")
}