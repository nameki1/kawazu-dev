import fs from "fs";
import path from "path";

export async function getPublicJson() {
  const filePath = path.join(process.cwd(), "public", "postData.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const publicJson = JSON.parse(fileContents);

  return publicJson;
}
