"use client";

import {
  Swap,
  SwapSettings,
  SwapSettingsSlippageDescription,
  SwapSettingsSlippageInput,
  SwapSettingsSlippageTitle,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
  SwapToast,
} from "@coinbase/onchainkit/swap";
import type { Token } from "@coinbase/onchainkit/token";
import { Nanum_Pen_Script } from "next/font/google";

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

export default function SwapComponents() {
  const ETHToken: Token = {
    address: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  };

  const VIRTUALToken: Token = {
    address: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
    chainId: 8453,
    decimals: 18,
    name: "Virtual Protocol",
    symbol: "VIRTUAL",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/base/0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b.png?size=lg&key=c559ad",
  };

  const PUPAIToken: Token = {
    address: "0xC127dC63F96adE4b28Bc5838910736D8aB68c645",
    chainId: 8453,
    decimals: 18,
    name: "Pupai",
    symbol: "PUPAI",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/base/0xc127dc63f96ade4b28bc5838910736d8ab68c645.png?size=lg&key=0422fa",
  };

  // add other tokens here to display them as options in the swap
  const swappableTokens: Token[] = [ETHToken, VIRTUALToken, PUPAIToken];

  return (
    <div>
      <Swap
        className={`bg-transparent text-cyan-700 text-nowrap italic w-full ${nanum.className}`}
      >
        <SwapSettings className="text-wrap">
          <SwapSettingsSlippageTitle className={`${nanum.className}`}>
            Max. slippage
          </SwapSettingsSlippageTitle>
          <SwapSettingsSlippageDescription className={`${nanum.className}`}>
            Your swap will revert if the prices change by more than the selected
            percentage.
          </SwapSettingsSlippageDescription>
          <SwapSettingsSlippageInput />
        </SwapSettings>
        <SwapAmountInput
          label="Sell"
          swappableTokens={swappableTokens}
          token={VIRTUALToken}
          type="from"
          className="bg-[#e7f9f5]"
        />
        <SwapToggleButton />
        <SwapAmountInput
          label="Buy"
          swappableTokens={swappableTokens}
          token={PUPAIToken}
          type="to"
          className="bg-[#e7f9f5]"
        />
        <SwapButton className="bg-cyan-700" />
        <SwapMessage className={`italic text-2xl ${nanum.className}`} />
        <SwapToast />
      </Swap>
    </div>
  );
}
