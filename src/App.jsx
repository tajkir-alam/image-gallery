import { useEffect, useState } from "react";
import "./App.css";
import GalleryCard from "./components/GalleryCard";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/imgFetch.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  console.log(images);

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white rounded-md">
        <h3 className="p-4 text-4xl font-semibold">Gallery</h3>
        <hr className="my-5 border" />
        <div className="p-4 grid grid-cols-5 gap-5">
          {images.map((image, index) => (
            <GalleryCard image={image} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
