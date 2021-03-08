import React, { useEffect } from "react";
import { BookCode } from "../../store/library/interfaces/book-code.interface";

interface Props {
  imgPortrait: string;
  bookName: string;
  book: BookCode;
}
const BookPortrait: React.FC<Props> = ({ imgPortrait, book, bookName }) => {
  const open = (verb: any, url: any, data: any, target: any) => {
    var form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_blank";
    if (data) {
      for (var key in data) {
        var input = document.createElement("textarea");
        input.name = key;
        input.value =
          typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
        form.appendChild(input);
      }
    }
    form.style.display = "none";
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // useEffect(() => {
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  // }, [])

  const handleRedirection = (e: any) => {
    e.preventDefault();
    open(
      "POST",
      "http://localhost:4000/books/serve",
      {
        code: book.code,
        user: book.user as string,
      },
      "_blank"
    );
  };
  return (
    <a
      href="http://localhost:4000/books/serve"
      target="_blank"
      rel="noopener noreferrer"
      className="book-portrait"
      onClick={handleRedirection}
    >
      <img src={imgPortrait} alt={bookName} />
      <span className="book-tooltip">{bookName}</span>
    </a>
  );
};

export default BookPortrait;
