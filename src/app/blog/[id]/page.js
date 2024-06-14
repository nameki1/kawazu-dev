import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { getBlogsJson } from "@/util/getBlogsJson";
import { renderToc } from "@/app/components/toc";
import markdownToHtml from "zenn-markdown-html";
import { SmTOC } from "@/app/components/smTOC";
import { RxUpdate } from "react-icons/rx";

export async function generateStaticParams() {
  // build時に作成したdata.jsonを取り出す
  const publicJson = await getBlogsJson();

  return publicJson.data.map((data) => ({
    slug: data.slug,
  }));
}

function getPostBySlug(publicJson, slug) {
  // publicJsonからslugが一致するものを探す
  const target = publicJson.data.find((item) => item.slug === slug);
  // 見つかれば値を、見つからなければnullを返す
  if (target) {
    return {
      post: target.p,
      postContent: target.postContent,
    };
  } else {
    return null;
  }
}

export default async function BlogArticle(context) {
  const slug = context.params.id;
  // build時に作成したdata.jsonを取り出す
  const publicJson = await getBlogsJson();
  // publicJsonからslugが一致するブログデータを取得する
  const postDetails = getPostBySlug(publicJson, slug);
  // 特定の記事情報
  const post = postDetails.post;
  // 特定の記事内容
  const postContent = postDetails.postContent;
  // マークダウンをHTMLに変換
  const renderHtml = markdownToHtml(postContent.parent || "", {
    embedOrigin: "https://embed.zenn.studio",
  });
  // 目次の作成
  const toc = renderToc(renderHtml);

  return (
    <main id="pageTop">
      {/* スマホ用目次 */}
      <SmTOC toc={toc} />
      <div className="pt-16 mb-12 md:mb-24">
        {/* アイキャッチ */}
        <Image
          src={post.eyeCatch}
          width={700}
          height={150}
          alt="Picture of the author"
          className="mx-auto"
        />
        {/* 記事タイトル */}
        <h1 className=" font-bold text-3xl mt-16 mb-5 text-center">
          {post.title}
        </h1>
        {/* 投稿日時 と 修正日時*/}
        <div className="flex justify-center items-center">
          <p className="pr-5">
            <time>{post.publishedAt}</time>
            に公開
          </p>
          <RxUpdate />
          <p className="pl-1">
            <time>{post.updateAt}</time>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-10">
        {/* 記事 */}
        <div className="bg-white py-10 px-5 md:p-10 md:col-span-7">
          <article>
            {/* タグ */}
            <div className="flex flex-wrap">
              {post.tags.map((tag, index) => (
                <button
                  key={index}
                  className="mr-5 py-1 px-3 rounded-full border-solid border-2 border-[#769cbf] hover:bg-[#769cbf] hover:text-white"
                >
                  <Link
                    href={`/category/${tag}`}
                    className="text-sm font-medium"
                  >
                    {tag}
                  </Link>
                </button>
              ))}
            </div>
            <div
              className="znc"
              dangerouslySetInnerHTML={{ __html: renderHtml }}
            ></div>
          </article>
        </div>
        {/* 目次 */}
        <div className="hidden col-span-3 sm:block">
          <div className=" bg-white py-10 px-6 ml-9 sticky top-0">
            <h3 className=" font-bold">目次</h3>
            <ul className="text-sm text-gray-600">
              {toc.map((data) =>
                data.name == "h1" ? (
                  // h1のとき
                  <div key={data.id} className="flex my-2 pr-3 pl-3">
                    <p className="pt-1 text-xs">●</p>
                    <li className="pl-3 font-bold">
                      <a href={`#${data.id}`}>{data.text}</a>
                    </li>
                  </div>
                ) : (
                  //  h2のとき
                  <div key={data.id} className="flex my-2 pr-3 pl-2">
                    <p className="text-xl">・</p>
                    <li className="pt-1 pl-3">
                      <a href={`#${data.id}`}>{data.text}</a>
                    </li>
                  </div>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
