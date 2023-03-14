import React, { Suspense } from "react";
import useNearScreen from "hooks/useNearScreen";
import Spinner from "component/Spinner";

// using react lazy to only import when needed dynamically
const TrendingSearches = React.lazy(() => import("./TrendingSearches"));

// a function to have a Lazy Load
export default function LazyTrending() {
  //custom hook for lazy load element TrendingSearches
  const { show, fromRef } = useNearScreen();

  // The suspense hook will render in the meantime when TrendingSearches is still in promise(loading)
  // The fallback will give back the spinner element in this case, it can be as default string(...loading) or null if you don't want to show anything
  return (
    <div ref={fromRef}>
      <Suspense fallback={<Spinner />}>
        {show ? <TrendingSearches /> : <Spinner />}
      </Suspense>
    </div>
  );
}
