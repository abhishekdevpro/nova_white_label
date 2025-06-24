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
      style={{
        borderRadius: "4px",
        display: "inline-block",
        padding: "2px 8px",
        backgroundColor: "#f8f9fa",
      }}
    ></div>
  );
};

export default GoogleTranslate;
