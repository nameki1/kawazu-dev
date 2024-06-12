const fs = require("fs");
const saveImage = require("./saveImage");

module.exports = async function getBookLists(books) {
  // publishedがtrueのみ抜き出す
  const publishedBooks = books.filter(
    (book) => book.properties.published.checkbox
  );
  const BookLists = publishedBooks.map((book) => {
    //レコードidの取り出し
    const id = book.id;
    //titleの取り出し
    const title = book.properties.title.title[0].plain_text;
    // publishedの取り出し
    const published = book.properties.published.checkbox;
    // categoryの取り出し
    const category = book.properties.category.select.name;
    // publishedAtの取り出し
    const publishedAt = book.properties.publishedAt.date.start;

    // 保存先フォルダのパス
    const destinationPath = "public/bookImages/" + id;
    // 保存ファイル名
    const filename = "/cover.png";
    // 保存したい画像ファイルのリンク
    const url = book.properties.cover.files[0].file.url;
    //　ファイルがなければ保存する
    if (!fs.existsSync(destinationPath + filename)) {
      saveImage(url, filename, destinationPath);
    }
    //coverの取り出し
    const cover = "/bookImages/" + id + filename;

    //slugの取り出し
    const slug = book.properties.slug.rich_text[0].plain_text;

    return {
      id,
      title,
      published,
      category,
      publishedAt,
      cover,
      slug,
    };
  });
  return BookLists;
};
