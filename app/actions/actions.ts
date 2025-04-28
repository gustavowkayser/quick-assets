"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { User, Wallet } from "@prisma/client";

export const getWallets = async ({ userId }: { userId: string }) => {
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
};

export const getUserId = async () => {
  try {
    const { userId } = await auth();
    return userId;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
};

export const getWalletsByUserId = async (userId: string) => {
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
};

export const createWallet = async (
  name: string,
  passcode: string,
  userId: string
) => {
  try {
    const newWallet = await prisma.wallet.create({
      data: {
        name: name,
        passcode: passcode,
        user: {
          connect: { id: userId },
        },
      },
    });
    return newWallet;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};
