import Image from "next/image";
import fs from "fs";
import path from "path";

export default function Home() {
  const filePath = path.join(process.cwd(), "public", "postData.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const postDetails = JSON.parse(fileContents);
  console.log(postDetails);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
