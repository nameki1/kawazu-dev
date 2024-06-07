import Link from "next/link";
import { getPublicJson } from "@/util/getPublicJson";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/util/getAllPosts";

export default async function Blog() {
  //const slug = publicJson.data.map((d) => d.slug);
  //console.log(slug);
  console.log("ここまで");
  //記事一覧の取得;
  const AllPostsList = await getAllPosts();
  console.log(AllPostsList);
  //const AllPostList = await publicJson.data.map((d) => d);
  //タグ一覧の取得;
  const tags = [...new Set(AllPostsList.flatMap((post) => post.tags))];
  console.log(tags);

  return (
    <main>
      <div className="grid grid-cols-1 py-5 md:grid-cols-3 md:pb-6 md:pt-12">
        {/* ブログ記事一覧の表示 */}
        <div className="py-3 bg-white col-span-2">
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
            {AllPostsList.map((value, index) =>
              value.published == true ? (
                // 公開する
                <li key={index}>
                  <article className="mx-2 p-2 border-solid border-4 rounded-lg border-white hover:border-[#769cbf]">
                    {/* 全体をリンク化 */}
                    <Link
                      href={{
                        pathname: `/blog/${value.slug}`,
                      }}
                    >
                      {/* アイキャッチ */}
                      <Image
                        src={value.eyeCatch}
                        width={360}
                        height={100}
                        alt="Picture of the author"
                        className="mx-auto"
                      />
                      <div className=" p-5">
                        {/* 投稿日時 */}
                        <p className=" font-tint-400 mb-1 block text-xs">
                          <time>{value.publishedAt}</time>
                        </p>
                        {/* ブログタイトル */}
                        <h2 className="text-base">{value.title}</h2>
                      </div>
                    </Link>
                  </article>
                </li>
              ) : (
                // 公開しない
                <></>
              )
            )}
          </ul>
        </div>
        {/* タグ一覧の表示 */}
        <div className=" order-first md:order-last md:max-h-screen md:pt-5 md:ml-5 md:px-5 overflow-auto bg-white col-span-1">
          <h3 className="  mt-5 mb-10 text-3xl">すべての記事</h3>
          <div className="order-first items-start flex overflow-x-scroll  md:order-last md:flex-wrap md:overflow-x-hidden">
            {tags.map((value, index) => (
              <button
                key={index}
                className="my-3 mr-5 py-1 px-3 bg-[#e6e5e4] rounded-full border-solid border-2 hover:border-[#769cbf]"
              >
                <Link href={`/category/${value}`} className="py-2 px-3 ">
                  {value}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
