'use server'

import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export const getWallets = async ({ userId } : { userId: string }) => {
  try {
    const wallets = await prisma.wallet.findMany({
        where: {
            userId: userId,
        },
    });
    return wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw error;
  }
}

export const getUserId = async () => {
    try {
        const { userId } = await auth();
        return userId;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
}