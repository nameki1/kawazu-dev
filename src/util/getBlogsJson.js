import fs from "fs";
import path from "path";

export async function getBlogsJson() {
  // build時に作成したdata.jsonを取り出す
  const filePath = path.join(process.cwd(), "public", "blogs.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const publicJson = JSON.parse(fileContents);

  return publicJson;
}
