"use client";

import React, { use } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStoreConfig } from "@/store/storeConfigs";
import { useRouter } from "next/navigation";
import WalletConnectButton from "./WalletConnectButton";

const Header: React.FC = () => {
  const router = useRouter();

  const toggleSideBar = useStoreConfig((state) => state.toggleSidebar);

  return (
    // desktop header
    <>
      <div className="bg-[#000000] z-10 relative hidden lg:block">
        <div className="flex max-w-[1280px] mx-auto h-[80px] bg-[#000000]">
          <div className=" flex justify-between w-full  ">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              SAMPLE SITE
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mx-3">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="bg-[#000000] z-10 relative flex justify-between lg:hidden py-2 px-5">
        <div className="flex justify-center items-center">SAMPLE LOGO</div>

        <div className="flex justify-center items-center">
          <Button variant="outline" onClick={toggleSideBar}>
            <AlignJustify />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
