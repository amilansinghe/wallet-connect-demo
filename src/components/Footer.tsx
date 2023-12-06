import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black pt-5 pb-5 text-center border-t-1 border-[#344255]">
      <p className="text-white text-sm">
        Copyright © {new Date().getFullYear()}. Developed by{" "}
        <Link href="#" target="_blank" rel="noreferrer">
          AMLS
        </Link>
        .
      </p>
    </div>
  );
};

export default Footer;
