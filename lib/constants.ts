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
