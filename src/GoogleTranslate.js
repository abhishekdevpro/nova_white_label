import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      const addScript = document.createElement("script");
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,fr,es,de",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      className="position-fixed bg-light border rounded px-2 py-1 shadow-sm"
      style={{
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    ></div>
  );
};

export default GoogleTranslate;
