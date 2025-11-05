import fs from "fs";
import path from "path";
import { FAQ } from "../types";

const FAQS_DATA_FILE_PATH = path.join(process.cwd(), "data", "faqs.json");

export function getFAQs(): FAQ[] {
	const data = JSON.parse(fs.readFileSync(FAQS_DATA_FILE_PATH, "utf-8"));
	return data;
}
