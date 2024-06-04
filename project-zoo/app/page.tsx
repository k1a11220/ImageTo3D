// Image -> Prompt -> Fuction -> 3D
"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Image to CAD</h1>
        <input type="file" onChange={handleChange} />
      </div>
    </main>
  );
}
