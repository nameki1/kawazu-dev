const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { notion } = require("../src/lib/notion");
const getPostContent = require("../src/util/getPostContent");
const getPostData = require("../src/util/getPostData");
const getBookLists = require("../src/util/getBookLists");
const getEventLists = require("../src/util/getEventLists");

dotenv.config();

async function generateData() {
  // publicの削除
  const rmDir = ["../public/articleImages", "../public/bookImages"];
  rmDir.map((item) => {
    // 絶対パスに変換
    const directoryPath = path.resolve(__dirname, item);

    if (fs.existsSync(directoryPath)) {
      fs.rmdirSync(directoryPath, { recursive: true });
      console.log("ディレクトリが削除されました:", directoryPath);
    } else {
      console.log("ディレクトリが存在しません:", directoryPath);
    }
  });
  const rmJson = [
    "../public/blogs.json",
    "../public/books.json",
    "../public/events.json",
  ];
  rmJson.map((item) => {
    // 絶対パスに変換
    const directoryPath = path.resolve(__dirname, item);

    if (fs.existsSync(directoryPath)) {
      fs.unlinkSync(directoryPath);
      console.log("ファイルが削除されました:", directoryPath);
    } else {
      console.log("ファイルが存在しません:", directoryPath);
    }
  });

  // BlogAPIの取得
  const responseBlog = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });
  const posts = responseBlog.results;

  // publishedがtrueのみ抽出
  const publishedPosts = await Promise.all(
    posts.filter((post) => post.properties.published.checkbox)
  );
  const data = await Promise.all(
    publishedPosts.map(async (post) => {
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
  // jsonファイルに保存
  fs.writeFileSync(
    path.join(__dirname, "../public/blogs.json"),
    JSON.stringify({ data }, null, 2)
  );

  // BookAPIの取得
  const responseBook = await notion.databases.query({
    database_id: process.env.BOOK_DATABASE_ID,
  });
  const books = responseBook.results;
  const bookLists = await getBookLists(books);
  // jsonファイルに保存
  fs.writeFileSync(
    path.join(__dirname, "../public/books.json"),
    JSON.stringify({ bookLists }, null, 2)
  );

  // EventAPIの取得
  const responseEvent = await notion.databases.query({
    database_id: process.env.EVENT_DATABASE_ID,
  });
  const events = responseEvent.results;
  const eventLists = await getEventLists(events, data);
  // jsonファイルに保存
  fs.writeFileSync(
    path.join(__dirname, "../public/events.json"),
    JSON.stringify({ eventLists }, null, 2)
  );
}

generateData().catch(console.error);
