import { useEffect, useState } from "react";
import "./App.css";

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
            <div
              key={index}
              className={`relative group rounded-lg overflow-hidden ${
                index === 0 && "col-span-2 row-span-2"
              }`}
            >
              <img
                src={image.src}
                alt=""
                className="border-2 rounded-lg"
                draggable
              />
              <div className="absolute top-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 duration-300">
                <input
                  type="checkbox"
                  className="m-2 border-white bg-white checkbox checkbox-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
