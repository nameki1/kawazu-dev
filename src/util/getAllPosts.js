import fs from "fs";
import path from "path";

export async function getAllPosts() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const publicJson = JSON.parse(fileContents);

  const AllPostsList = publicJson.data.map((p) => {
    console.log(p);

    //レコードidの取り出し
    const id = p.post.id;
    //titleの取り出し
    const title = p.post.properties.title.title[0].plain_text;
    // publishedの取り出し
    const published = p.post.properties.published.checkbox;
    // tagsの取り出し
    const tags = p.post.properties.tags.multi_select.map((item) => item.name);
    // categoryの取り出し
    const category = p.post.properties.category.select.name;
    // overviewの取り出し
    const overview = p.post.properties.overview.rich_text[0].plain_text;
    // publishedAtの取り出し
    const publishedAt = p.post.properties.publishedAt.date.start;
    //updateAtの取り出し
    const updateAt = p.post.properties.updateAt.date.start;
    //eyeCatchの取り出し
    const eyeCatch = p.post.properties.eyeCatch.files[0].file.url;
    //slugの取り出し
    const slug = p.post.properties.slug.rich_text[0].plain_text;

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
  });
  return AllPostsList;
}
