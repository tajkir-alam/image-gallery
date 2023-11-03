import React, { useState } from "react";

const GalleryCard = ({
  image,
  index,
  selectedImages,
  handleImageSelection,
  handleDragStart,
  handleDragOver,
  handleDragEnd
}) => {
  const [checked, setChecked] = useState(false);
  const isSelected = selectedImages.includes(index);

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragEnd={handleDragEnd}
      className={`relative group rounded-lg overflow-hidden cursor-grab ${index === 0 && "lg:col-span-2 lg:row-span-2"}`}
    >
      <img
        src={image.src}
        alt="Ollyo_Image_Gallery"
        className={`border-2 rounded-lg w-full`}
        loading="lazy"
      />
      <div
        className={`absolute top-0 w-full h-full bg-black/20 group-hover:opacity-100 duration-300 ${isSelected ? "opacity-20" : "opacity-0"}`}
      ></div>
      <input
        type="checkbox"
        checked={selectedImages.includes(index)}
        onChange={() => {
          setChecked(!checked);
          handleImageSelection(index);
        }}
        className={`absolute inset-5 ${isSelected ? "opacity-100" : "opacity-0"} bg-white group-hover:opacity-100 checkbox checkbox-primary border-0 hover:border-0 rounded-none`}
      />
    </div>
  );
};

export default GalleryCard;
