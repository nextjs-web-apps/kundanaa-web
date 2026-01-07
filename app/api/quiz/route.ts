import { prisma } from "@/lib/prisma";
import { manyQuestionSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const questions = await prisma.question.findMany({});
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz", error);
    return NextResponse.json(
      {
        error: "Error fetching quiz",
      },
      { status: 500 }
    );
  }
}

// POST many questions: array of questions
// BULK post
export async function POST(req: NextRequest) {
  try {
    // get req body
    const body = await req.json();
    // validate data
    const validatedData = manyQuestionSchema.parse(body);

    // create new
    const count = await prisma.question.createMany({ data: validatedData });
    return NextResponse.json(count, { status: 201 });
  } catch (error) {
    console.error("error post quiz :", error);
    return NextResponse.json(
      { error: `error creating quiz, ${typeof error}` },
      { status: 500 }
    );
  }
}
