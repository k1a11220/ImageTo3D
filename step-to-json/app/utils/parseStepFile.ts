// utils/parseStepFile.ts

export interface NURBSData {
  degree: number;
  controlPoints: number[][];
  weights: number[];
  knots: number[];
}

export const parseStepFile = (fileContent: string): NURBSData[] => {
  const nurbsData: NURBSData[] = [];
  const lines = fileContent.split("\n");

  lines.forEach((line) => {
    // Implement the actual parsing logic
    // This is a simplified example
    const match = line.match(/NURBS data pattern/);
    if (match) {
      const degree = parseInt(match[1]);
      const controlPoints = match[2]
        .split(";")
        .map((point) => point.split(",").map(Number));
      const weights = match[3].split(",").map(Number);
      const knots = match[4].split(",").map(Number);

      nurbsData.push({ degree, controlPoints, weights, knots });
    }
  });

  return nurbsData;
};
