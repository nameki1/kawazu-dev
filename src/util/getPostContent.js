const fs = require("fs");
const { notion } = require("../lib/notion");
const saveImage = require("./saveImage");

const staticPath = "public";
const imagesPath = "/articleImages/";
const { NotionToMarkdown } = require("notion-to-md");

const n2m = new NotionToMarkdown({ notionClient: notion });

// notionのcodeブロックにファイル名とdiffの構成を追加
n2m.setCustomTransformer("code", (block) => {
  const { code } = block;
  const language = code.language === "text" ? "plain text" : code.language;
  const fileName = code.caption.map((item) => item.plain_text).join("");
  const codeString = code.rich_text.map((item) => item.plain_text).join("");

  if (language === "diff") {
    return `\`\`\`${language} ${fileName || "text"}
${codeString}
\`\`\``;
  }

  if (language === "plain text" && fileName) {
    return `\`\`\`${fileName}
${codeString}
\`\`\``;
  }

  return `\`\`\`${language}${fileName ? `:${fileName}` : ""}
${codeString}
\`\`\``;
});

// embed(リンクカードの埋め込み)
n2m.setCustomTransformer("embed", (block) => {
  const { embed } = block;
  if (!embed.url) return "";

  return `
${embed.url}
`;
});

// image(notionの画像が１時間しか表示されない問題の対応)
n2m.setCustomTransformer("image", (block) => {
  const articlePath = block.parent.page_id;
  // 保存先フォルダのパス
  const destinationPath = staticPath + imagesPath + articlePath;
  // 保存ファイル名
  const filename = "/" + block.id + ".png";
  // 保存したい画像ファイルのリンク
  const url = block.image.file.url;
  //　ファイルがなければ保存する
  try {
    if (!fs.existsSync(destinationPath + filename)) {
      saveImage(url, filename, destinationPath);
    }
    block.image.file.url = imagesPath + articlePath + filename;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
});

module.exports = async function getPostContent(pageId) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  const mdStrings = n2m.toMarkdownString(mdblocks);

  return mdStrings;
};
