"use server";

import * as fs from "fs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import path from "path";
import { Prisma } from "@/app/generated/prisma";

// Create new user in mongodb
// This is creating user without any provider
export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  if (!name || !email) {
    throw new Error("name and email are mandatory");
  }
  try {
    await prisma.user.create({ data: { name, email } });
    revalidatePath("/");
  } catch (error) {
    // console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("User already exists");
    }
    prisma.$disconnect();
    throw error;
  }
};

// Get all users from mongodb
// This is collection of users of all providers and without provider
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        // createdAt: "desc",
        name: "asc",
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    throw error;
  }
};

// get json content from serverside files
export const getJsonFile = async (fileName: string) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/dashboard/_questions",
      fileName
    );
    const data = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(data);
    return questions;
  } catch (error) {
    console.log("error getting json", error);
    return null;
  }
};
