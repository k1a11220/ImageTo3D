// components/StepParser.tsx
import { useState } from "react";
import { NURBSData, parseStepFile } from "../utils/parseStepFile";

const StepParser = () => {
  const [parsedData, setParsedData] = useState<NURBSData[]>([]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        const nurbsData = parseStepFile(fileContent);
        setParsedData(nurbsData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
};

export default StepParser;
