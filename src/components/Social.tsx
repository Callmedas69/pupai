import { socialLink } from "@/app/paramaters";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const SocialPage = () => {
  return (
    <div className="flex flex-row gap-2 py-5">
      {socialLink.map((social, index) => (
        <div key={index}>
          <Link href={social.path} target="_blank">
            <Image
              src={social.image}
              alt={social.title}
              width={35}
              height={35}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
