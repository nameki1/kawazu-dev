const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { notion } = require("../src/lib/notion");
const getPostContent = require("../src/util/getPostContent");
const saveImage = require("../src/util/saveImage");

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
      // slugの取得
      const slug = post.properties.slug.rich_text[0].plain_text;

      // 記事をHTMLにパースして取得
      const postId = post.id;
      const postContent = await getPostContent(postId);

      // アイキャッチ画像の保存
      // 保存先フォルダのパス
      const destinationPath = "public/articleImages/" + postId;
      // 保存ファイル名
      const filename = "/eyeCatch.png";
      // 保存したい画像ファイルのリンク
      const url = post.properties.eyeCatch.files[0].file.url;
      //　ファイルがなければ保存する
      if (!fs.existsSync(destinationPath + filename)) {
        saveImage(url, filename, destinationPath);
      }
      post.properties.eyeCatch.files[0].file.url =
        "/articleImages/" + postId + filename;

      return {
        slug,
        post,
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
