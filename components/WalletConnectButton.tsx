"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import Image from "next/image";

const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="default"
                    className="border border-[#6560BD] rounded-[15px] bg-black text-white hover:bg-[#6560BD]"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    variant="destructive"
                    className=" rounded-full"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    onClick={openChainModal}
                    type="button"
                    variant="default"
                    className="border border-[#6560BD] rounded-[15px] bg-black text-white hover:bg-[#6560BD] hidden md:hidden lg:flex lg:items-center max-w-[150px] items-center space-x-1 "
                  >
                    {chain.hasIcon && (
                      <div
                      // style={{
                      //   background: chain.iconBackground,
                      //   backgroundPosition: "center",
                      //   backgroundRepeat: "no-repeat",
                      //   backgroundSize: "contain",
                      //   width: 24,
                      //   height: 24,
                      //   borderRadius: 999,
                      //   overflow: "hidden",
                      // }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={24}
                            height={24}
                          />
                        )}
                      </div>
                    )}
                    <p className="truncate">{chain.name}</p>
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    type="button"
                    variant="default"
                    className="border border-[#6560BD] rounded-[15px] bg-black text-white hover:bg-[#6560BD] flex"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;
