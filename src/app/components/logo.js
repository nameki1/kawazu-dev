import React from "react";
import Link from "next/link";

export const Logo = ({ title }) => {
  return (
    <Link href={"/"}>
      <h1 className="items-center md:text-2xl font-extrabold uppercase ${className}">
        {title}
      </h1>
    </Link>
  );
};
