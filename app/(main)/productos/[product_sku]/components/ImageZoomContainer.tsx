"use client";

import Image from "next/image";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageZoomContainerProps {
  image_url: string,
  name: string
}

export default function ImageZoomContainer({ image_url, name }: ImageZoomContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section className="relative flex-1 border-1 border-black/5 rounded-xs mt-8 md:mt-0">
      <Image
        src={image_url}
        alt={name}
        className=" h-full w-full object-contain"
        width={1920}
        height={1080} />
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="hidden md:block absolute cursor-pointer bg-white right-2 bottom-2 p-4 border rounded-2xl">
        <ZoomIn />
      </div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <img
            src={image_url}
            alt={name}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8
            }}
          />
          <div className="absolute w-8/12 h-11/12">
            <div
              onClick={() => setIsOpen(prev => !prev)}
              className="absolute right-0 bg-white cursor-pointer p-4 border rounded-2xl">
              <ZoomOut />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}