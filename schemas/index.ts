import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be atleast 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be atleast 6 characters long",
    }),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

export const LoginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be atlease 6 characters long",
  }),
});

export const AddResourceSchema = z.object({
  title: z.string().min(1, { error: "title required" }),
  resource: z.string().min(1, { error: "Please provide resource" }),
});

export enum Subject {
  ENGLISH = "English",
  TELUGU = "Telugu",
  MATHEMATICS = "Mathematics",
  SCIENCE = "Science",
  SOCIAL = "Social",
  COMPUTER = "Computer",
}
export const SubjectTitles = [
  "English",
  "Telugu",
  "Mathematics",
  "Science",
  "Social",
  "Computer",
] as const;
export const QuestionSchema = z.object({
  title: z.enum(Subject, {
    error: () => ({ message: "Please select a valid title" }),
  }),
  category: z.string().min(1, "Category is required"),
  text: z.string().min(5, "Question is too short"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(4, "Exactly 4 options required"),
  correctOption: z.coerce
    .number()
    .int()
    .min(0)
    .max(3, "Index must be between 0 and 3"),
});
export type QuestionFormData = z.infer<typeof QuestionSchema>;
export const manyQuestionSchema = z.array(QuestionSchema);
