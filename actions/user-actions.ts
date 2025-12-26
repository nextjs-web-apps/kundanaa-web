"use server";

import { QuestionData, QuestionsProps } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Papa, { ParseResult } from "papaparse";
import * as fs from "fs";

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
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002") {
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

// reading json
export const readEngJson = async () => {
  try {
    const data = fs.readFileSync("public/english.json", "utf-8");
    const questions = JSON.parse(data);
    return questions;
  } catch (error) {
    console.log("error reading json", error);
    return null;
  }
};
