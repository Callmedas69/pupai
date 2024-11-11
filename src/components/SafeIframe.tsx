import React from "react";
import { useState, useEffect } from "react";

interface SafeIframeProps {
  src: string;
  title: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | string;
  sandbox?: string;
  allowFullScreen?: boolean;
  minHeight?: string;
}

const SafeIframe: React.FC<SafeIframeProps> = ({
  src,
  title,
  className = "",
  aspectRatio = "16/9",
  sandbox = "allow-same-origin allow-scripts",
  allowFullScreen = false,
  minHeight = "300px",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <div className="w-full">
      <div
        className={`relative w-full ${className}`}
        style={{
          aspectRatio: aspectRatio,
          minHeight: minHeight,
        }}
      >
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          sandbox={sandbox}
          loading="lazy"
          allowFullScreen={allowFullScreen}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default SafeIframe;
