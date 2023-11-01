import { useEffect, useState } from "react";
import "./App.css";
import GalleryCard from "./components/GalleryCard";

function App() {
  const [images, setImages] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelection = (index) => {
    setSelectedImages((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index); // Deselect the image
      } else {
        return [...prevIndices, index]; // Select the image
      }
    });
  };

  console.log(selectedImages);

  useEffect(() => {
    fetch("/imgFetch.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white rounded-md">
        <h3 className="p-4 text-4xl font-semibold">
          {selectedImages.length === 0
            ? "Gallery"
            : `${selectedImages.length} ${
                selectedImages.length === 1 ? "File" : "Files"
              } Selected`}
        </h3>
        <hr className="my-5 border" />
        <div className="p-4 grid grid-cols-5 gap-5">
          {images.map((image, index) => (
            <GalleryCard
              image={image}
              index={index}
              setSelectedImages={setSelectedImages}
              handleImageSelection={handleImageSelection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
