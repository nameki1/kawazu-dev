import fs from "fs";
import path from "path";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Event() {
  // build時に作成したevents.jsonを取り出す
  const filePath = path.join(process.cwd(), "public", "events.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const publicJson = JSON.parse(fileContents);

  const eventList = publicJson.eventLists;
  return (
    <main>
      <div className="pt-5 bg-white">
        <h1 className="ml-4 mb-5">参加イベント一覧</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="参加イベント一覧">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>イベント名</TableCell>
                <TableCell>主催者</TableCell>
                <TableCell>内容</TableCell>
                <TableCell>カテゴリ</TableCell>
                <TableCell>ログ</TableCell>
                <TableCell>メモ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventList.map((event) => (
                <TableRow
                  key={event.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {event.date}
                  </TableCell>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>{event.contents}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/blog/${event.slug}`,
                      }}
                      className="text-[#769cbf] underline"
                    >
                      {event.slugTitle}
                    </Link>
                  </TableCell>
                  <TableCell>{event.memo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
