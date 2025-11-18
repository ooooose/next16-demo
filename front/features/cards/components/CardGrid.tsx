import { Suspense } from "react";
import { Card } from "./Card";

export const CardGrid = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card />
    </Suspense>
  );
};