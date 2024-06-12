const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { notion } = require("../src/lib/notion");
const getPostContent = require("../src/util/getPostContent");
const getPostData = require("../src/util/getPostData");

dotenv.config();

async function generateData() {
  // 記事一覧の取得
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });
  const posts = response.results;

  //
  const data = await Promise.all(
    posts.map(async (post) => {
      // 記事情報の取得
      const p = await getPostData(post);

      // slugの取得
      const slug = p.slug;

      // 記事をHTMLにパースして取得
      const postId = p.id;
      const postContent = await getPostContent(postId);

      return {
        slug,
        p,
        postContent,
      };
    })
  );

  fs.writeFileSync(
    path.join(__dirname, "../public/data.json"),
    JSON.stringify({ data }, null, 2)
  );
}

generateData().catch(console.error);
