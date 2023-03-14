import { useState, useEffect, useRef } from "react";
import "intersection-observer";

export default function useNearScreen({
  distance = "100px",
  externalRef,
  once = true,
} = {}) {
  const [show, setShow] = useState(false);
  const fromRef = useRef();
  useEffect(function () {
    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        // at the moment setShow is true you have to disconnect the observer, otherwise it will keep observing
        once && observer.disconnect();
      } else {
        !once && setShow(false);
      }
    };

    // to give support to internet explorer 11 interception observer

    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    // to have access to the actual value (current) of the referent
    if (element) observer.observe(element);

    // When this component is not in use then this function will disconnect the observer
    return () => observer.disconnect();
  });

  return { show, fromRef };
}
