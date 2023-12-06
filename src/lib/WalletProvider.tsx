"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([bsc], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "SAMPLE WALLET CONNECT",
  projectId: "ad00a4f170ed7fa27f0f33cb7f756a48",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#6460b7",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
