export const PicNone =
  "https://lh3.googleusercontent.com/a-/AOh14GhRv3JUcLKBQD3GSVZZbHHoQBxvPXafNlPICiU_=s96-c";

export const Student = "/student.svg";

export interface QuestionData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  category: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface QuizProps {
  questions: QuestionData[];
}
