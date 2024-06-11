"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/app/components/logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IconContext } from "react-icons";
import styles from "../style/sidebar.module.css";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  const navbarList = [
    { title: "Blog", href: "/blog" },
    // { title: "Tag", href: "/category" },
    { title: "Book", href: "/book" },
  ];
  return (
    <header className=" drop-shadow-xl flex md:h-24 bg-white relative z-30">
      <div className=" container mx-auto my-6 flex justify-between items-center pl-5 pr-8 lg:pr-16">
        <Logo title="大海も空の青さも知らず" />
        <div className="hidden md:inline-flex items-center gap-7">
          {navbarList.map((value, index) => (
            <Link
              key={index}
              href={value.href}
              className="text-sm uppercase font-semibold relative group overflow-hidden py-3"
            >
              {value.title}
              <span className="w-full h-[3px] rounded-full bg-[#769CBF] absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200"></span>
            </Link>
          ))}
        </div>
        {/* ハンバーガーメニュー */}
        <IconContext.Provider value={{ size: "30px" }}>
          <button onClick={menuFunction} className="md:hidden">
            <RxHamburgerMenu />
          </button>
        </IconContext.Provider>
      </div>

      {/* OpenmenuがTrueのとき表示 */}
      <div className={openMenu ? styles.sidebar_show : styles.sidebar_hidden}>
        <IconContext.Provider value={{ size: "30px" }}>
          <div className=" flex justify-end">
            <button onClick={menuFunction} className="mr-8 mt-8 h-8 w-8">
              <RxCross1 />
            </button>
          </div>
        </IconContext.Provider>
        <nav className="fixed mt-8 z-auto h-full">
          {navbarList.map((value, index) => (
            <div
              key={index}
              className="px-12 py-4 font-bold text-2xl"
              onClick={menuFunction}
            >
              <Link href={value.href}>{value.title}</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};
