export const PicNone =
  "https://lh3.googleusercontent.com/a-/AOh14GhRv3JUcLKBQD3GSVZZbHHoQBxvPXafNlPICiU_=s96-c";

export const Student = "/student.svg";

export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correctAnswers: number[];
}

export interface QuizProps {
  questions: QuestionData[];
}

export type SheetRow = {
  subject: string;
  section: string;
  id: number;
  text: string;
  option_0: string;
  option_1: string;
  option_2: string;
  option_3: string;
  correctAnswer:number;
};
