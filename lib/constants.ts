export const PicNone =
  "https://lh3.googleusercontent.com/a-/AOh14GhRv3JUcLKBQD3GSVZZbHHoQBxvPXafNlPICiU_=s96-c";

export const Student = "/student.svg";

export interface Option {
  id: string;
  text: string;
}
export interface QuestionData {
  id: string;
  questionText: string;
  options: Option[];
  correctOption: string[];
}

export interface QuestionsProps {
  questions: QuestionData[];
}
