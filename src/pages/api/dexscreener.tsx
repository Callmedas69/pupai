import { NextApiRequest, NextApiResponse } from "next/types";

const baseUrl = "https://api.dexscreener.com/latest/dex/tokens/";
const pupai = "0xC127dC63F96adE4b28Bc5838910736D8aB68c645";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(`${baseUrl}${pupai}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DexScreenerResponse = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return res.status(500).json({ message: "Error fetching token metadata" });
  }
}
