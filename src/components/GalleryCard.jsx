import React, { useState } from "react";

const GalleryCard = ({
  image,
  index,
  handleImageSelection,
}) => {
  const [checked, setChecked] = useState(false);

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
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            handleImageSelection(index);
          }}
          className="m-4 bg-white checkbox checkbox-primary border-0 hover:border-0 rounded-none"
        />
      </div>
    </div>
  );
};

export default GalleryCard;
