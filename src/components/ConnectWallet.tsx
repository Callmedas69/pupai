"use client";

import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  Socials,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useAccount } from "wagmi";
import { Nanum_Pen_Script } from "next/font/google";

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

export function ConnectWalletComponents() {
  const { address } = useAccount();

  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet withWalletAggregator className="bg-[#e7f9f5]">
          <ConnectWalletText
            className={`text-nowrap text-2xl text-cyan-700 ${nanum.className}`}
          >
            CONNECT WALLET
          </ConnectWalletText>
          <Avatar className="h-8 w-8" />
          <Name className={`${nanum.className}`} />
        </ConnectWallet>
        <WalletDropdown className={`${nanum.className}`}>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name className={`${nanum.className}`} />
            <Address
              className={`${color.foregroundMuted} ${nanum.className} text-xl`}
            />
            <EthBalance className={`${nanum.className} text-2xl`} />
            <Socials className={`${nanum.className}`} />
          </Identity>
          <WalletDropdownBasename className={`${nanum.className}`} />
          <WalletDropdownDisconnect className={`${nanum.className}`} />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
