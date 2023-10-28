import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { AiFillCloseCircle } from "react-icons/ai";

const CreateLisitng = () => {
  const [files, setFile] = useState({});
  const [imageUplodError, setImageUploadError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);
  const resetFileInput = () => {
    document.getElementById("images").value = "";
  };
  const handleImageUpload = () => {
    if (files && files.length < 7 && formData.imageUrls.length < 7) {
      setLoading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setSuccessMessage("Image(s) uploaded successfully");
          setLoading(false);
          resetFileInput();
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          setImageUploadError("Image upload failed 5mb max");
          setLoading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images at a time");
      setLoading(false);
    }
  };
  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const clearError = () => {
    setImageUploadError(false);
    setSuccessMessage("");
  };

  useEffect(() => {
    if (imageUplodError || successMessage) {
      const timer = setTimeout(clearError, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [imageUplodError, successMessage]);

  const handleRemoveImage = (index) => () => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create Listing Page
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="rounded-md border p-3"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="rounded-md border p-3"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="rounded-md border p-3"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                id="bedrooms"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-md"
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                id="bathrooms"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-md"
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                id="regularPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-md"
              />
              <div className="flex items-center">
                <span>Regular Prices</span>
                <span>($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                id="discountPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-md"
              />
              <div className="flex items-center">
                <span>Discounted Price</span>
                <span>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images</p>
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files)}
              className="border border-gray-300 rounded-md w-full p-3"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={loading}
              onClick={handleImageUpload}
              className="text-green-700  p-3 text-center cursor-pointer border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">
            {imageUplodError ? imageUplodError : ""}
          </p>
          <p className="text-green-700">
            {" "}
            {successMessage ? successMessage : ""}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 border items-center"
                key={index}
              >
                <img
                  src={url}
                  alt="listing-image"
                  className="w-20 h-20 object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage(index)}
                  className="text-red-700 w-5 h-5"
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            ))}
          <button className="bg-slate-700 p-3 text-white rounded-md uppercase hover:opacity-95 opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateLisitng;
