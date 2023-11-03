import { useEffect, useRef, useState } from "react";
import "./App.css";
import GalleryCard from "./components/GalleryCard";
import { FaRegImage } from "react-icons/fa";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const imageUploadRef = useRef(null);
  const [draggedImage, setDraggedImage] = useState(null);

  // Selecting images and storing in a state
  const handleImageSelection = (index) => {
    setSelectedImages((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  // opening file manager to get image
  const handleUplaodImage = () => {
    if (imageUploadRef) {
      imageUploadRef.current.click();
    }
  }

  // adding image to show on UI
  const handleImage = (e) => {
    let image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages([...images, { src: e.target.result }])
    };
    reader.readAsDataURL(image);
  }

  // image delete function
  const handleDelete = () => {
    const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
    setImages(updatedImages);
    setSelectedImages([]);
  };


  // ----- DND functions Start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setDraggedImage(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedImage !== null && draggedImage !== index) {
      const updatedImages = [...images];
      const [draggedItem] = updatedImages.splice(draggedImage, 1);
      updatedImages.splice(index, 0, draggedItem);
      setImages(updatedImages);
      setDraggedImage(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
  };
  // ----- DND functions End

  // Fetching images 
  useEffect(() => {
    fetch("/imgFetch.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="p-4 text-xl lg:text-4xl font-semibold">
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
        <div className="p-4 grid grid-cols-2 lg:grid-cols-5 gap-5 duration-300">
          {images.map((image, index) =>
            <GalleryCard
              key={index}
              image={image}
              index={index}
              selectedImages={selectedImages}
              handleImageSelection={handleImageSelection}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
            />
          )}
          <button onClick={handleUplaodImage}
            className={`${images.length === 0 && "col-span-2 row-span-2 h-[24rem]"} ${images.length === 1 && 'h-[13.5rem]'} h-[13.5rem] flex flex-col justify-center items-center rounded-lg bg-black/5 border-2 border-dashed border-black/20 space-y-3 cursor-pointer scale-100 active:scale-95 duration-300`}>
            <span className="text-2xl"><FaRegImage /></span>
            <p className="text-xl">Add Images</p>

            {/* Hidden Input for uploading Image */}
            <input
              type="file"
              ref={imageUploadRef}
              onChange={handleImage}
              accept="image/*"
              className="hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
