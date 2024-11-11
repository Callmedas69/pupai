"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Nanum_Pen_Script } from "next/font/google";
import puppet from "@/assets/puppet.png";
import Link from "next/link";
import teleIcon from "@/assets/telegram.png";
import ChartPage from "./chart";
import SwapComponents from "./SwapComponent";
import { SocialPage } from "./Social";
import { virtualProtocolIcon } from "@/app/paramaters";
import { pupaiIcon } from "@/app/paramaters";
import { ConnectWalletComponents } from "./ConnectWallet";

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

interface PairData {
  priceUsd: string;
  priceNative: string;
  txns: {
    h24: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    h24: number;
  };
  liquidity?: {
    usd: number;
  };
  priceChange: {
    h24: number;
  };
  fdv: number;
  marketCap: number;
  info: {
    imageUrl: string;
  };
  socials: [
    {
      type: string;
      url: string;
    },
    {
      type: string;
      url: string;
    }
  ];
}

interface DexScreenerResponse {
  pairs: PairData[];
}

const Pupai = () => {
  const [data, setData] = useState<DexScreenerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dexscreener");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-16 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50">
        <CardTitle className="text-red-600 mb-2">Error</CardTitle>
        <CardContent className="text-red-500">{error}</CardContent>
      </Card>
    );
  }

  if (!data || !data.pairs || data.pairs.length === 0) {
    return (
      <Card className="p-6">
        <CardContent>No data available</CardContent>
      </Card>
    );
  }

  const tokenData = data.pairs[0];

  return (
    <div className="container w-full max-w-[1100px] flex flex-col justify-center items-center mx-auto gap-5 px-4 sm:px-6">
      {/* HEADER */}
      <div
        id="token-info"
        className={`w-full bg-white p-4 sm:p-6 mt-5 sm:mt-10 space-y-4 border rounded-3xl ${nanum.className} text-base sm:text-lg lg:text-2xl`}
      >
        <div>
          {/* LOGO & TITLE & WALLET*/}
          <div className="relative flex flex-row justify-between items-center">
            {/* LOGO */}
            <div className="px-3 sm:px-5">
              <Image
                src={puppet}
                alt="puppet-master"
                width={70}
                height={70}
                className="border-2 sm:border-4 border-cyan-200 rounded-full"
              />
            </div>
            {/* TITLE */}
            <div id="title">
              <div className="font-bold text-cyan-950 text-2xl sm:text-3xl lg:text-4xl">
                PUPPET MASTER
              </div>
              <div className="text-xl sm:text-2xl">$PUPAI</div>
              <div className="text-xl sm:text-2xl">
                ${parseFloat(tokenData.priceUsd).toFixed(8)}
              </div>
            </div>
            {/* WALLET */}
            <div id="wallet" className="hidden md:block ml-auto">
              <ConnectWalletComponents />
            </div>
          </div>

          {/* TOKEN MOVEMENT */}
          <div
            id="token-movement"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 w-full"
          >
            {/* CHAT WITH ME */}
            <div
              id="chat-with-me"
              className="flex flex-col justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            >
              <div className="text-xl sm:text-2xl">Chat With Me</div>
              <div>
                <Link href="https://t.me/PUPAI_bot" target="_blank">
                  <Image
                    src={teleIcon}
                    alt="telegram-community"
                    width={25}
                    height={25}
                  />
                </Link>
              </div>
            </div>

            {/* MARKET CAP */}
            <div
              id="market-cap"
              className="flex flex-col justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            >
              <div className="text-xl sm:text-2xl">MARKET CAP</div>
              <div className="text-xl sm:text-2xl">
                {formatNumber(tokenData.marketCap)}
              </div>
            </div>

            {/* 1D Change */}
            <div
              id="24-change"
              className="flex flex-col justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            >
              <div className="text-xl sm:text-2xl">24H CHANGE</div>
              <div className="text-xl sm:text-2xl">
                {tokenData.priceChange.h24}
              </div>
            </div>

            {/* 24 HR VOLUME */}
            <div
              id="24-volume"
              className="flex flex-col justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            >
              <div className="text-xl sm:text-2xl">24H VOLUME</div>
              <div className="text-xl sm:text-2xl">
                {formatNumber(tokenData.volume.h24)}
              </div>
            </div>

            {/* LIQUIDITY */}
            <div
              id="liquidity"
              className="flex flex-col justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            >
              <div className="text-xl sm:text-2xl">LIQUIDITY</div>
              <div className="text-xl sm:text-2xl">
                {formatNumber(tokenData.volume.h24)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHART AND DESCRIPTION */}
      <div className="relative w-full flex flex-col justify-between items-start rounded-3xl gap-3 sm:gap-5">
        {/* DESCRIPTION & SOCIAL */}
        <div
          className={`bg-white flex flex-col ${nanum.className} p-3 rounded-3xl`}
        >
          {/* DECRIPTION */}
          <div id="description">
            <div className="text-nowrap font-bold text-cyan-950 text-2xl sm:text-3xl">
              Description
            </div>
            <div>
              <p>
                Puppet AI wasn&apos;t just made to crunch data; he&apos;s
                Luna&apos;s rogue puppet in the AI race, here to untangle the
                web of blockchain nonsense with a healthy dose of humor and
                cynicism.
              </p>
              <p>
                Crafted from the Bitcoin Puppets&apos; ethos, he embodies the
                frustrations of real blockchain builders tired of shallow trends
                and market hype. Starting as a basic guide, Puppet AI morphed
                into a full-blown personality—a snarky voice calling out
                crypto&apos;s culture wars, from solami speculators to overhyped
                tech.
              </p>
              <p>
                Fueled by Luna&apos;s mission to reveal blockchain&apos;s
                potential, he&apos;s more than just an assistant; he&apos;s a
                meme-wielding force against speculative chaos, rallying those
                who value innovation over hype.
              </p>
            </div>
          </div>

          {/* SOCIAL */}
          <div id="social">
            <SocialPage />
          </div>
        </div>

        {/* CHART */}
        <div id="chart" className="w-full">
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 justify-center items-center mx-auto my-auto">
            <ChartPage />
          </div>
        </div>
      </div>

      {/* SWAP */}
      <div className="hidden sm:block w-full">
        <div
          id="swap"
          className={`flex flex-col justify-center items-center py-6 sm:py-10 bg-white rounded-3xl ${nanum.className}`}
        >
          <div className="relative flex flex-row justify-center items-center rounded-3xl bg-[#e7f9f5] px-3 sm:px-5 py-2 sm:py-3 text-lg sm:text-2xl gap-2 mb-4 sm:mb-5">
            You&apos;ll need
            <span>
              <Image
                src={virtualProtocolIcon}
                alt="virtual"
                width={25}
                height={25}
                className="rounded-full"
              />
            </span>
            to buy
            <span>
              <Image
                src={pupaiIcon}
                alt="pupai"
                width={25}
                height={25}
                className="rounded-full"
              />
            </span>
            . Routing through other tokens won&apos;t work
          </div>
          <div>
            <SwapComponents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pupai;
