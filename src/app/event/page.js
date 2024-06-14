import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function Event() {
  // build時に作成したevents.jsonを取り出す
  const filePath = path.join(process.cwd(), "public", "events.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const publicJson = JSON.parse(fileContents);

  const eventList = publicJson.eventLists;
  return (
    <main>
      <div className="mt-5 bg-white">
        <table className="table-auto">
          <caption className="font-medium">参加イベント一覧</caption>
          <thead>
            <tr>
              <th>日付</th>
              <th>イベント名</th>
              <th>主催者</th>
              <th>内容</th>
              <th>カテゴリ</th>
              <th>ログ</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map((event, index) => (
              <tr key={index}>
                {/* 日付 */}
                <td>{event.date}</td>
                {/* イベント名 */}
                <td>{event.eventName}</td>
                {/* 主催者 */}
                <td>{event.organizer}</td>
                {/* 内容 */}
                <td>{event.contents}</td>
                {/* カテゴリ */}
                <td>{event.category}</td>
                {/* ログ */}
                <td>
                  <Link
                    href={{
                      pathname: `/blog/${event.slug}`,
                    }}
                  >
                    {event.slugTitle}
                  </Link>
                </td>
                {/* メモ */}
                <td>{event.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
