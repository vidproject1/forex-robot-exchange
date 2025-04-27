
import { useState } from "react";

interface RobotImageGalleryProps {
  mainImage: string;
  title: string;
}

export function RobotImageGallery({ mainImage, title }: RobotImageGalleryProps) {
  return (
    <div className="w-full">
      <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded bg-muted overflow-hidden"
          >
            <img
              src="/placeholder.svg"
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
