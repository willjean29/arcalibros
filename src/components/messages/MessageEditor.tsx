import React, { useRef, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";

interface IProps {
  handleChange: (value: any) => void;
  text: string;
}

const MessageEditor: React.FC<IProps> = ({ handleChange, text }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ align: [] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link"],
        ["clean"],
      ],
    },
  };
  const formats = [
    "header",
    "font",
    "formula",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <ReactQuill
      value={text}
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={(value) => {
        handleChange(value);
      }}
    />
  );
};

export default MessageEditor;
