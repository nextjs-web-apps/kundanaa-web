import { google } from "googleapis";
import { QuestionData } from "./constants";

const credentials = {
  type: process.env.GOOGLE_SHEETS_TYPE as string,
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID as string,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ) as string,
  client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL as string,
  client_id: process.env.GOOGLE_SHEETS_CLIENT_ID as string,
  token_url: process.env.GOOGLE_SHEETS_TOKEN_URL as string,
  universe_domain: process.env.GOOGLE_SHEETS_UNIVERSE_DOMAIN as string,
};

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string;

export async function getGoogleSheetsData(range: string) {
  try {
    const auth = await google.auth.getClient({
      // Use the defined credentials object
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"], // Read-only scope is sufficient for fetching data
    });

    const sheets = google.sheets({ version: "v4", auth });

    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not defined");
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // // The data structure from the API is an array of arrays (rows and columns)
    // return response.data.values as string[][];

    const data = response.data.values as string[][];
    const headers = data[0];
    const rows = data.slice(1);

    if (rows.length === 0) return undefined;

    const jsonData = rows.map(function (row) {
      const obj: QuestionData = {
        id: 0,
        subject: "",
        section: "",
        text: "",
        options: [],
        correctAnswers: [],
        solution: "",
      };
      const options: string[] = [];
      const answers: number[] = [];

      headers.forEach(function (header, index) {
        if (header.toString().toLowerCase() === "id") {
          obj["id"] = Number(row[index]);
        } else if (header.toString().toLowerCase() === "subject") {
          obj["subject"] = row[index];
        } else if (header.toString().toLowerCase() === "section") {
          obj["section"] = row[index];
        } else if (header.toString().toLowerCase() === "text") {
          obj["text"] = row[index];
        } else if (header.toString().toLowerCase().includes("options")) {
          options.push(row[index]);
          obj["options"] = options;
        } else if (
          header.toString().toLowerCase().includes("correct_answers")
        ) {
          for (let i = 0; i < row[index].toString().length; i++) {
            answers.push(Number(row[index].toString()[i]));
          }
          obj["correctAnswers"] = answers;
        } else if (header.toString().toLowerCase() === "solution") {
          obj["solution"] = row[index];
        }
      });

      return obj;
    });

    return jsonData;
  } catch (error) {
    console.error("Error fetching data from Google Sheets", error);
    return undefined;
  }
}
