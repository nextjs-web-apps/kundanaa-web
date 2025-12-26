"use client";

import { QuestionData } from "@/lib/constants";
import Papa, { ParseResult } from "papaparse";

export const getCSVData = () => {
  let mydata;
  Papa.parse("/english2.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    delimiter: ",",
    complete: (results: ParseResult<QuestionData>) => {
      mydata = results.data;
    },
    error: () => null,
  });
  return mydata;
};
