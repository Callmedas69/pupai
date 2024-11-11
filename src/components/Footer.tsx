"use client";

import React from "react";
import base from "@/assets/base.svg";
import Image from "next/image";
import { footerLink } from "@/app/paramaters";
import Link from "next/link";
import { Nanum_Pen_Script } from "next/font/google";
import CopyContractAddress from "./CopyContract";
import { motion } from "framer-motion";
import Onchainkit from "@/assets/Onchainkit";

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const Footer = () => {
  return (
    <div className="w-full">
      <div
        className={`flex flex-row max-sm:flex-col justify-between items-center max-sm:gap-4 bg-white p-5 mt-16 ${nanum.className} text-3xl`}
      >
        {/* LEFT SIDE */}
        <div className="flex flex-row justify-center items-center gap-5 rounded-3xl bg-[#e7f9f5] px-5 py-2">
          <div>0xDas</div>
          <div>
            <Link href={"https://x.com/base"} target="_blank">
              <Image src={base} alt="base" />
            </Link>
          </div>
          <div>
            <Link href={"https://onchainkit.xyz/"} target="_blank">
              <Onchainkit />
            </Link>
          </div>
        </div>

        {/* MIDDLE SIDE */}
        <div className="flex flex-row gap-1 bg-[#e7f9f5] px-5 py-3 rounded-3xl">
          {footerLink.map((footer, index) => (
            <div key={index}>
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
              >
                <Link href={footer.path} target="_blank">
                  <Image
                    src={footer.image}
                    alt={footer.title}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-[#e7f9f5] pl-5 py-5 flex flex-row justify-center items-center gap-2 rounded-3xl">
            0xC127...68c645
            <span>
              <CopyContractAddress contractAddress="0xC127dC63F96adE4b28Bc5838910736D8aB68c645" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
