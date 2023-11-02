import { useEffect, useState } from "react";
import "./App.css";
import GalleryCard from "./components/GalleryCard";
import { FaRegImage } from "react-icons/fa";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelection = (index) => {
    setSelectedImages((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const handleDelete = () => {
    const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleDragStart = (e, index) => {
    // e.dataTransfer.setData("", index.toString());
    console.log(e);
  };

  const handleDragEnd = () => {
    console.log("drag end");
  };

  useEffect(() => {
    fetch("/imgFetch.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="p-4 text-4xl font-semibold">
            {selectedImages.length === 0
              ? "Gallery"
              : `${selectedImages.length} ${selectedImages.length === 1 ? "File" : "Files"
              } Selected`}
          </h3>
          {selectedImages.length > 0 && (
            <button
              onClick={handleDelete}
              className="pr-5 text-red-500 font-semibold hover:underline"
            >
              Delete {selectedImages.length === 1 ? "file" : "files"}
            </button>
          )}
        </div>
        <hr className="my-5 border" />
        <div className="p-4 grid grid-cols-5 gap-5">
          {images.map((image, index) => (
            <GalleryCard
              image={image}
              index={index}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              handleImageSelection={handleImageSelection}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          ))}
          <div className={`rounded-lg bg-black/5 border-2 border-dashed border-black/20 p-5 text-white ${images.length === 0 && "col-span-2 row-span-2"}`}>
            <span><FaRegImage /></span>
            <p>Add Images</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
