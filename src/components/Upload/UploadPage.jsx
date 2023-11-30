import React, { useEffect, useState } from "react";
import "./Upload.css";
import { storage } from "../FireBase/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
const UploadPage = () => {

  //file is selected image file
  const [file, setFile] = useState(null);

  //total Images from fireBase 
  const [imageList, setImageList] = useState([]);

  //type is only png or jpeg
  const type = ["image/png", "image/jpeg"];

  //imageListRef is for listAll the ref value based data to imageList
  const imageListRef = ref(storage, "images/");

  // upload button function onClick
  const uploadImage = () => {
    if (file === null) return;
    //imageRef for store the data with folder name
    const imageRef = ref(storage, `images/${file.name + Date()}`);

    // uploadBytes takes 2 parameters for imageRef and file to store the file in imageRef folder
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      })
      .catch((err) => console.log(err));
    console.log(file);
  };

  //useEffect for listAll the data based on imageListRef  
  useEffect(() => {
    listAll(imageListRef).then((res) =>
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      })
    );
  }, []);
  return (
    <center>
      <h3>This Is Image Upload</h3>
      <div className="form">
        <label htmlFor="file"> Select</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p>{file && file.name}</p>
        <button className="upload-btn" onClick={uploadImage}>
          Upload
        </button>
        <hr />

        {imageList.map((url, ind) => {
          return (
            <img className="image" alt={url} width={200} key={ind} src={url} />
          );
        })}

        <div></div>
      </div>
    </center>
  );
};

export default UploadPage;
