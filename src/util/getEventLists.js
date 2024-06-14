module.exports = async function getEventLists(events, data) {
  // publishedがtrueのみ抜き出す
  const publishedEvents = events.filter(
    (event) => event.properties.published.checkbox
  );
  const EventLists = publishedEvents.map((event) => {
    //レコードidの取り出し
    const id = event.id;
    // publishedの取り出し
    const published = event.properties.published.checkbox;
    // dateの取り出し
    const date = event.properties.date.date.start;
    //eventNameの取り出し
    const eventName = event.properties.eventName.title[0].plain_text;
    //organizerの取り出し
    const organizer = event.properties.organizer.rich_text[0].plain_text;
    //contentsの取り出し
    const contents = event.properties.contents.rich_text[0].plain_text;
    // categoryの取り出し
    const category = event.properties.category.select.name;
    //memoの取り出し
    const memo = event.properties.memo?.rich_text[0]?.plain_text || "";
    //slugの取り出し
    const slug = event.properties.slug?.rich_text[0]?.plain_text || "";

    // slug nameの格納
    const d = data.find((item) => item.p.slug == slug);
    const slugTitle = d?.p.title || "";

    return {
      id,
      published,
      date,
      eventName,
      organizer,
      contents,
      category,
      memo,
      slug,
      slugTitle,
    };
  });
  return EventLists;
};
