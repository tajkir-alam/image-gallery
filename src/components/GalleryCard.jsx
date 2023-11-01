import React from "react";

const GalleryCard = ({image, index}) => {
  return (
    <div
      key={index}
      className={`relative group rounded-lg overflow-hidden ${
        index === 0 && "col-span-2 row-span-2"
      }`}
    >
      <img src={image.src} alt="" className="border-2 rounded-lg" draggable />
      <div className="absolute top-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 duration-300">
        <input
          type="checkbox"
          className="m-2 border-white bg-white checkbox checkbox-primary"
        />
      </div>
    </div>
  );
};

export default GalleryCard;
