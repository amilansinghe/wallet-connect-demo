"use client";

import { useStoreConfig } from "@/store/storeConfigs";
import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { AlignRight } from "lucide-react";
import { useRouter } from "next/navigation";
import WalletConnectButton from "./WalletConnectButton";

const SideBar: React.FC = () => {
  const router = useRouter();
  const isSidebarOpen = useStoreConfig((state) => state.isSidebarOpen);
  const toggleSideBar = useStoreConfig((state) => state.toggleSidebar);

  const sidebarRef = useRef(null);

  //handle outside click

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !(sidebarRef.current as any).contains(event.target)
    ) {
      toggleSideBar();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when isSidebarOpen becomes false
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen]);

  //handle outside click
  return (
    <aside
      ref={sidebarRef}
      className={`
    fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-900
    transition-transform ease-in-out duration-300 lg:hidden
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#090909] border-r-2">
        <div className="header flex items-center justify-between border-b py-2">
          <div className="logo cursor-pointer" onClick={() => router.push("/")}>
            {/* <Image
              src="/assets/logo.png"
              alt="mobile logo"
              width={50}
              height={25}
            /> */}
            <h1>SAMPLE</h1>
          </div>
          <div className="close-button">
            <Button variant="ghost" onClick={toggleSideBar}>
              <AlignRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center items-center">
          <div className="mt-5">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
