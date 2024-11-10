import React, { lazy, Suspense } from "react";
import Loading from "../pages/Loading";
const Weather = lazy(() => import("../pages/Weather"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Weather />
      </Suspense>
    </>
  );
}

export default App;
