"use client";
import StepParser from "./components/StepParser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <StepParser />
      </div>
    </main>
  );
}
