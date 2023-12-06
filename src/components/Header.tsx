import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";

const Header = () => {
  return (
    <Navbar
      maxWidth="full"
      className="lg:pl-10 lg:pr-10 mt-4"
      position="sticky"
    >
      <NavbarBrand>
        <Link href="/">
          <span className="text-[24px] font-bold">SAMPLE</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <WalletConnect />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
