"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";

// Define the types for the component's props
interface CopyContractAddressProps {
  contractAddress: string;
}

const CopyContractAddress: React.FC<CopyContractAddressProps> = ({
  contractAddress,
}) => {
  const [copied, setCopied] = useState(false);

  // Function to copy the contract address
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      // Reset the copied state after a short delay
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={(handleCopy) => {
        toast({
          description: "$PUPAI contract copied",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
          className: "bg-white",
        });
      }}
      className="mt-2 p-2 bg-transparent flex items-center border-0"
    >
      <div className="flex flex-row justify-center items-center gap-4">
        <div>
          <Copy size={20} className="gap-5" />
        </div>
        <div>{copied ? " Copied!" : ""}</div>
      </div>
    </button>
  );
};

export default CopyContractAddress;
