"use server";

import * as fs from "fs";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { prisma } from "@/lib/prisma";
import path from "path";
import { Prisma } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { QuestionFormData, QuestionSchema } from "@/schemas";

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

export const delQuestion = async ({ questionId }: { questionId: string }) => {
  try {
    const response = await prisma.question.delete({
      where: { id: questionId },
    });
    return NextResponse.json({
      message: `${response.id} is deleted from ${response.id}`,
    });
  } catch (error) {
    console.error("Error deleting question :", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "error deleting question",
    });
  }
};

// POST QUIZ QUESTION
export const createQuestion = async (data: QuestionFormData) => {
  /*   const result = QuestionSchema.safeParse(data);
  if (!result.success) {
    console.error("error validating question data");
    throw new Error("error validating question data");
  } */
  try {
    const question = QuestionSchema.parse(data);
    const newQuestion = await prisma.question.create({
      data: {
        title: question.title,
        category: question.category,
        text: question.text,
        options: question.options,
        correctOption: question.correctOption,
      },
    });

    revalidatePath("/quiz"); // refresh the quiz page data
    return newQuestion;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("error validating data", error.issues);
      throw error.issues;
    }
    console.error("error validating data", error);
    throw error;
  }
};

// GET QUIZ QUESTIONS
export const getQuestions = async () => {
  return await prisma.question.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};
