'use server'

// lib/actions/createUserIfNotExists.ts
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

interface UserProps {
  name: string | null | undefined; 
  email: string | undefined; 
}

export async function createUserIfNotExists(userId: string, userData: UserProps) {
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  console.log("Usuário está logado")

  // Verifica se o usuário já existe no banco
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Se já existir, não faz nada
  if (existingUser) {
    console.log("Usuário já existe")
    return existingUser;
  }

  // Se não existir, cria o novo usuário
  const newUser = await prisma.user.create({
    data: {
      id: userId,
      name: userData.name,
      email: userData.email,
    },
  });

  console.log("Usuário criado com sucesso")
  return newUser;
}
