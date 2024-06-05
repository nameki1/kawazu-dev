const dotenv = require("dotenv");
const { Client } = require("@notionhq/client");

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = { notion };
