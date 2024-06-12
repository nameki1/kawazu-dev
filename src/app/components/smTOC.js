"use client";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { RxCaretDown } from "react-icons/rx";
import { RxCaretUp } from "react-icons/rx";
import Link from "next/link";

export const SmTOC = (toc) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="sticky top-0 z-10 md:hidden">
      {/* ダウンメニュー */}
      <button onClick={menuFunction} className="w-full bg-white">
        <div className="flex items-center m-3 justify-end">
          <p className="text-xl">目次</p>
          <IconContext.Provider value={{ size: "30px" }}>
            {openMenu ? <RxCaretUp /> : <RxCaretDown />}
          </IconContext.Provider>
        </div>
      </button>
      {/* openMenuがtrueのとき表示する */}
      {openMenu ? (
        <div className="absolute w-full">
          <div className="p-5 bg-white w-4/5 shadow-2xl rounded-md ml-auto mr-6 opacity-95">
            <ul className="text-sm text-gray-600">
              {/* topへ戻るリンク */}
              <div className="flex my-2 pr-3 pl-2.5 items-center">
                <p className="text-base">↑</p>
                <li className="pl-3">
                  <Link href={`#pageTop`} onClick={menuFunction}>
                    ページトップへ
                  </Link>
                </li>
              </div>
              {/* 目次 */}
              {toc.toc.map((data) =>
                data.name == "h1" ? (
                  // h1のとき
                  <div key={data.id} className="flex my-2 pr-3 pl-3">
                    <p className="pt-1 text-xs">●</p>
                    <li className="pl-3 font-bold">
                      <a href={`#${data.id}`} onClick={menuFunction}>
                        {data.text}
                      </a>
                    </li>
                  </div>
                ) : (
                  //  h2のとき
                  <div key={data.id} className="flex my-2 pr-3 pl-2">
                    <p className="text-xl">・</p>
                    <li className="pt-1 pl-3">
                      <a href={`#${data.id}`} onClick={menuFunction}>
                        {data.text}
                      </a>
                    </li>
                  </div>
                )
              )}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
