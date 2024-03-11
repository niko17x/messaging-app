// EXPERIMENTING WITH FILE UPLOADS USING MULTER, FORMDATA(), FILEREADER()

import { useState } from "react";

export const TestingPage = () => {
  const [imgSrc, setImgSrc] = useState(
    "../src/assets/images/profile-image-icon.png"
  ); // Set default image source
  const [file, setFile] = useState();

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        // When file has been read, set imgSrc to the result
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(selectedFile); // Read the file
    }
  };

  const handleClick = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("api/user/testing", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div>
      <img src={imgSrc} alt="Profile preview" />{" "}
      <input type="file" name="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
};
