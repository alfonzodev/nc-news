import { useRef, useEffect } from "react";

const AutoResizeTextArea = ({ value, onChange, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to shrink on text removal
      textarea.style.height = "auto";

      // Set the height to scrollHeight to grow with the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full focus:outline-none p-1 resize-none min-h-44 h-auto text-xl font-light overflow-hidden"
      placeholder="Write something"
      {...props}
    />
  );
};

export default AutoResizeTextArea;
