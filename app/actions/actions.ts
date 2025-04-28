"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { User, Wallet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getWallets = async ({ userId }: { userId: string | null | undefined }) => {
  if (!userId) return
  
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
  userId: string | null
) => {
  if (!userId) return

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
    revalidatePath("/");
    return newWallet;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

export const getWalletById = async (walletId: string) => {
  try {
    const wallet = prisma.wallet.findUnique({
      where: {
        id: walletId,
      }
    })
    return wallet
  } catch (error) {
    throw new Error('An error ocurred while trying to get Wallet')
  }
}

export const deleteWalletById = async (walletId: string) => {
  try {
    const deletedWallet = prisma.wallet.delete({
      where: {
        id: walletId,
      }
    })
    revalidatePath("/");
    return deletedWallet
  } catch (error) {
    throw new Error('Error deleting wallet')
  }

}
