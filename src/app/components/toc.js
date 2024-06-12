const cheerio = require("cheerio");

export const renderToc = (html) => {
  const $ = cheerio.load(html);
  const headings = $("h1, h2").toArray();
  const toc = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
    name: data.name,
  }));
  return toc;
};
