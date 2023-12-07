"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WalletConnectButton from "../WalletConnectButton";
import {
  readContract,
  writeContract,
  waitForTransaction,
  prepareWriteContract,
} from "@wagmi/core";
import { smartContractConfig } from "../../blockchain/web3.config";
import { Hex, parseUnits } from "viem";
import { useToast } from "@/components/ui/use-toast";
export default function Home() {
  const { address } = useAccount();
  const { toast } = useToast();

  const [numberOfNfts, setNumberOfNfts] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0.22);
  const [isMintingLoading, setIsMintingLoading] = useState(false);

  const contractAddress = smartContractConfig.mintContractAddress;
  const contractAbi = smartContractConfig.mintContractAbi;
  const chainId = parseInt(smartContractConfig.chainId);

  useEffect(() => {
    if (numberOfNfts > 0) {
      setTotalAmount(numberOfNfts * 0.22);
    }
  }, [numberOfNfts]);

  const handleMintNft = async () => {
    try {
      setIsMintingLoading(true);

      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "safeMint",
        args: [address as Hex, numberOfNfts],
        chainId: chainId,
        value: parseUnits(totalAmount.toString(), 18),
      });

      const { hash } = await writeContract(request);
      const result = await waitForTransaction({ hash });

      if (result) {
        toast({
          title: "⛓️ NFT Minted",
          description: "NFT has been minted successfully",
        });
        setIsMintingLoading(false);
      }
    } catch (error: any) {
      console.log("error", error);

      toast({
        title: "🚧 Mint failed",
        description: error?.shortMessage || "Mint has failed",
      });
      setIsMintingLoading(false);
    }
  };
  return (
    <div className="min-h-screen lg:overflow-hidden  overflow-y-scroll w-full flex flex-col  lg:px-[10rem] md:px-[2rem] sm:px-[2rem] px-[2rem] py-10">
      <div className="grid justify-items-center">
        <div className="p-5 border border-[#181818] bg-[#f6a018] rounded-[8px] lg:w-1/2 md:w-2/3 sm:w-full w-full">
          <div className="grid justify-items-center md:p-5 p-1">
            <div className="flex flex-row">
              <span className="text-3xl font-bold text-white">
                Mint a "CashHand Provider" Today
              </span>
            </div>
            <div className="flex flex-row mt-12">
              <Button
                className="rounded-full hover:border-[#1d847c] hover:bg-white bg-[#1d847c] hover:border-4 text-white text-[24px] hover:text-black"
                onClick={() =>
                  setNumberOfNfts(numberOfNfts < 1 ? 1 : numberOfNfts - 1)
                }
              >
                -
              </Button>
              <span className="text-3xl font-bold text-white mx-12">
                {numberOfNfts}
              </span>
              <Button
                className="rounded-full hover:border-[#1d847c] hover:bg-white bg-[#1d847c] hover:border-4 text-white text-[24px] hover:text-black"
                onClick={() => setNumberOfNfts(numberOfNfts + 1)}
              >
                +
              </Button>
            </div>
            <span className="text-2xl font-bold text-white mt-5">
              Unit Cost: 0.22 BNB + Gas Fees
            </span>
            <span className="text-2xl font-bold text-white mt-4">
              Total Cost: {totalAmount} BNB + Gas Fees
            </span>
            {address ? (
              <Button
                variant="default"
                className=" border-[#6560BD] rounded-[15px] border-4 bg-yellow-700 text-white hover:bg-[#6560BD] mt-5 text-[18px] font-bold"
                onClick={handleMintNft}
                type="button"
              >
                Mint NFT
              </Button>
            ) : (
              <div>
                <WalletConnectButton />
              </div>
            )}
            <span className="text-2xl font-bold text-red-500 mt-5 flex items-center">
              Become a CashHand Provider and receive Passive income
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
