"use client";
// pages/ImageToCad.tsx
import { ai } from "@kittycad/lib";
import React, { useState } from "react";

interface TextToCadProps {
  response?: any; // Placeholder for future response type
}

const ImageToCad: React.FC<TextToCadProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any | null>(null); // Placeholder for future response

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Handle image processing here (see next steps)
    }
  };

  const handleGenerateCad = async () => {
    if (!file) {
      console.error("Please select an image first.");
      return;
    }

    // Integrate image processing logic here (see next steps)
    // This will generate a prompt based on the image content

    const prompt = "The prompt for the model."; // Placeholder for generated prompt

    try {
      const response = await ai.create_text_to_cad({
        output_format: "stl",
        body: { prompt },
      });
      setResponse(response);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Image to CAD</h1>
        <input type="file" onChange={handleChange} />
        <button onClick={handleGenerateCad}>Generate CAD</button>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
    </main>
  );
};

export default ImageToCad;
