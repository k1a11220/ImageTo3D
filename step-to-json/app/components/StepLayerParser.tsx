"use client";
// components/StepParser.tsx
import { useState } from "react";
import { StepToJsonParser } from "step-to-json";

const StepParser = () => {
  const [parsedData, setParsedData] = useState<any>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;
        if (fileContent) {
          // Add your parsing logic here
          const parsedJson = parseStepFile(fileContent as string);
          setParsedData(parsedJson);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseStepFile = (fileContent: string) => {
    // Mock parser function - replace with actual parsing logic
    // For example, replace this with the code logic shown in previous steps
    const parser = new StepToJsonParser(fileContent); // Instantiate parser with file

    console.log(parser);
    const jsonData = parser.parse(); // Parse the file
    return { data: jsonData, message: "Step file parsed successfully" };
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {parsedData && <pre>{JSON.stringify(parsedData, null, 2)}</pre>}
    </div>
  );
};

export default StepParser;
