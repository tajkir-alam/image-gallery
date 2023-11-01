import React, { useState } from "react";

const GalleryCard = ({
  image,
  index,
  selectedImages,
  handleImageSelection,
  handleDragStart,
  handleDragEnd,
}) => {
  const [checked, setChecked] = useState(false);
  const isSelected = selectedImages.includes(index);

  return (
    <div
      key={index}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", index.toString());
        handleDragStart(index);
      }}
      onDragEnd={() => handleDragEnd()}
      draggable
      className={`relative group rounded-lg overflow-hidden ${
        index === 0 && "col-span-2 row-span-2"
      }`}
    >
      <img src={image.src} alt="" className="border-2 rounded-lg" />
      <div
        className={`absolute top-0 w-full h-full bg-black/20 ${
          isSelected ? "opacity-20" : "opacity-0"
        } group-hover:opacity-100 duration-300`}
      ></div>
      <input
        type="checkbox"
        checked={selectedImages.includes(index)}
        onChange={() => {
          setChecked(!checked);
          handleImageSelection(index);
        }}
        className={`absolute inset-5 ${
          isSelected ? "opacity-100" : "opacity-0"
        } bg-white group-hover:opacity-100 checkbox checkbox-primary border-0 hover:border-0 rounded-none`}
      />
    </div>
  );
};

export default GalleryCard;
