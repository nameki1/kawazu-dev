const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { notion } = require("../src/lib/notion");
const getPostContent = require("../src/util/getPostContent");
const getPostData = require("../src/util/getPostData");
const getBookLists = require("../src/util/getBookLists");

dotenv.config();

async function generateData() {
  // 記事一覧の取得
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

  // 本一覧の取得
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
}

generateData().catch(console.error);
