const fs = require("fs");
const saveImage = require("./saveImage");

module.exports = async function getPostData(post) {
  //レコードidの取り出し
  const id = post.id;
  //titleの取り出し
  const title = post.properties.title.title[0].plain_text;
  // publishedの取り出し
  const published = post.properties.published.checkbox;
  // tagsの取り出し
  const tags = post.properties.tags.multi_select.map((item) => item.name);
  // categoryの取り出し
  const category = post.properties.category.select.name;
  // overviewの取り出し
  const overview = post.properties.overview.rich_text[0].plain_text;
  // publishedAtの取り出し
  const publishedAt = post.properties.publishedAt.date.start;
  //updateAtの取り出し
  const updateAt = post.properties.updateAt.date.start;

  // アイキャッチ画像の保存
  // 保存先フォルダのパス
  const destinationPath = "public/articleImages/" + id;
  // 保存ファイル名
  const filename = "/eyeCatch.png";
  // 保存したい画像ファイルのリンク
  const url = post.properties.eyeCatch.files[0].file.url;
  //　ファイルがなければ保存する
  if (!fs.existsSync(destinationPath + filename)) {
    saveImage(url, filename, destinationPath);
  }
  //eyeCatchの取り出し
  const eyeCatch = "/articleImages/" + id + filename;

  //slugの取り出し
  const slug = post.properties.slug.rich_text[0].plain_text;

  return {
    id,
    title,
    published,
    tags,
    category,
    overview,
    publishedAt,
    updateAt,
    eyeCatch,
    slug,
  };
};
