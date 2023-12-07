"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const extendedBscMainnet = {
  ...bsc,
  rpcUrls: {
    ...bsc.rpcUrls,
    default: {
      http: [
        ...bsc.rpcUrls.default.http,
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
      ],
    },
    public: {
      http: [
        ...bsc.rpcUrls.public.http,
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
      ],
    },
  },
};

const extendedBscTestnet = {
  ...bscTestnet,
  rpcUrls: {
    ...bscTestnet.rpcUrls,
    default: {
      http: [
        ...bscTestnet.rpcUrls.default.http,
        "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
        "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
        "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
        "https://bsc-testnet.publicnode.com",
      ],
    },
    public: {
      http: [
        ...bscTestnet.rpcUrls.public.http,
        "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
        "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
        "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
        "https://bsc-testnet.publicnode.com",
      ],
    },
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    extendedBscMainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true"
      ? [extendedBscTestnet]
      : []),
  ],
  [publicProvider()],
  { rank: true }
);

const walletConnectId: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";

const projectId: string = walletConnectId;

const { wallets } = getDefaultWallets({
  appName: "sample wallet connect",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "sample wallet connect",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function RainbowKit({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        theme={darkTheme({
          accentColor: "#000000",
          accentColorForeground: "#ffffff",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
