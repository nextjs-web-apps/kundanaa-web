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

const AnswerOptionSchema = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  text: z.string().min(1, { error: "Option cannot be empty" }),
});

export const QustionSchema = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  text: z.string().min(1, { message: "Question cannot be empty" }),
  options: z
    .array(AnswerOptionSchema)
    .min(1, "At lease one option is required"),
  correctOptionId: z.string(),
});

export const AddResourceSchema = z.object({
  title: z.string().min(1, { error: "title required" }),
  resource: z.string().min(1, { error: "Please provide resource" }),
});
