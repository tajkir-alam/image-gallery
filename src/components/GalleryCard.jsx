import React, { useState } from "react";

const GalleryCard = ({
  image,
  index,
  selectedImages,
  handleImageSelection,
  handleDragStart,
  handleDragEnd,
  handleDrop,
  handleDragOver,
  isDragging,
  draggingIndex,
  hoverIndex,
}) => {
  const [checked, setChecked] = useState(false);
  const isSelected = selectedImages.includes(index);

  const handleDragEnter = () => {
    if (isDragging && hoverIndex !== null) {
      handleDrop(index);
    }
  };

  return (
    <div
      key={index}
      onDragStart={() => handleDragStart(index)}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      draggable
      className={`relative group rounded-lg overflow-hidden cursor-grab ${index === 0 && "lg:col-span-2 lg:row-span-2"} ${isDragging && index === draggingIndex ? "opacity-50" : ""}`}
    >
      <img src={image.src} alt="" className={`border-2 rounded-lg w-full`} />
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
