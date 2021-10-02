import { useRef } from "react";

const upload = () => {
  const imgRef = useRef();

  const handleUpload = async () => {
    const file = imgRef.current.files[0];
    const data = new FormData();
    data.append("file", file);
    // data.append("upload_preset", "internal_books_profile");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const response = await res.json();
    console.log(response);
  };
  return (
    <div>
      <input
        type="file"
        ref={imgRef}
        onChange={() => {
          console.log(imgRef.current.files[0]);
        }}
      />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};

export default upload;
