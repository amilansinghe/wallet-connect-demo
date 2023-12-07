"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-[#000000] py-[20px] border-t">
        <div className="flex flex-col justify-center items-center ">
          <div>
            <h1 className="text-[12px]">COPYRIGHT © 2023 Developed by AMLS</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
