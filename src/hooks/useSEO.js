import { useEffect, useRef } from "react";

export default function useSEO({ title, description }) {
  // accessing to title
  const prevTitle = useRef(document.title);
  // accessing description
  const prevDescr = useRef(
    document.querySelector('meta[name="description"]').getAttribute("content")
  );

  useEffect(() => {
    // Using ref to access prev title
    const previousTitle = prevTitle.current;
    if (title) {
      // giving de detail page his own title => check detail page/index.js
      document.title = `${title} | Giphy`;
    }
    //After going back from detail to home it will give back prev title // reset of the useEffect
    return () => (document.title = previousTitle);
  }, [title]);

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = prevDescr.current;

    if (description) {
      metaDescription.setAttribute("content", description);
    }

    return () => metaDescription.setAttribute("content", previousDescription);
  }, [description]);
}
