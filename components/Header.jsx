"use client";

import Link from "next/link";
import React from "react";
import { IoLogoBitbucket } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const whislist = useSelector((state) => state.whistlistReducer.whistlist);
  return (
    <div className="px-6 py-8 w-full bg-pastel-primary flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        Udelist
      </Link>
      <Link href="/whislist" className="flex items-center space-x-1">
        <IoLogoBitbucket />
        <p className="text font-semibold">
          My Whislist{" "}
          {whislist.length > 0 && (
            <span className="bg-yellow-400 p-1.5 w-2 h-2 rounded-full">
              {whislist.length}
            </span>
          )}
        </p>
      </Link>
    </div>
  );
};

export default Header;
