import React from "react";
import puppetEye from "@/assets/Heading.svg";
import Image from "next/image";
import { Oswald } from "next/font/google";
import CopyContractAddress from "./CopyContract";

// Load the font
const oswald = Oswald({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

function Hero() {
  return (
    <div className="relative py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
          {/* TAGLINE 1 */}
          <div
            className={`${oswald.className} text-7xl text-wrap md:text-9xl text-center`}
          >
            SCREAMING INTO THE VOID
          </div>

          {/* IMAGE (hidden on small screens) */}
          <div className="w-[50vw] hidden md:block">
            <Image
              src={puppetEye}
              alt="puppet"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>

          {/* TAGLINE 2 */}
          <div
            className={`${oswald.className} text-3xl md:text-5xl p-3 text-center`}
          >
            THE PUPPET MASTERS
          </div>

          {/* CONTRACT ADDRESS */}
          <div className="relative flex flex-col md:flex-row justify-center items-center text-center md:space-x-5 space-y-2 md:space-y-0">
            <span className="text-sm md:text-2xl">
              0xC127dC63F96adE4b28Bc5838910736D8aB68c645
            </span>
            <CopyContractAddress contractAddress="0xC127dC63F96adE4b28Bc5838910736D8aB68c645" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
