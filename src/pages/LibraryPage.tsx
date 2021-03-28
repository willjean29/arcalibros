import React, { useEffect, useState } from "react";
import LibraryCard from "../components/library/LibraryCard";

import imgIcon from "../assets/images/child1.png";
import NavbarBooks from "../components/library/NavbarBooks";
import BookPortrait from "../components/library/BookPortrait";
import { useDispatch, useSelector } from "react-redux";
import { loadLibrary } from "../store/library/library.actions";
import { RootStore } from "../store/store";
import { Book } from "../store/library/interfaces/book.interface";

const LibraryPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStore) => state.user.user);
  const libraryUrl = "https://meet.arcavirtual.net/books";
  const books = useSelector((state: RootStore) => state.library.books);
  // const [levelSelected, setLevelSelected] = useState("");

  useEffect(() => {
    dispatch(loadLibrary(user?._id as string));
  }, []);

  return (
    <div className="library-page">
      <div className="library-page-container global-container">
        <NavbarBooks />

        <div className="level-course-container">
          <h2>Selecciona tu nivel educativo</h2>
          <div className="three-components">
            <LibraryCard
              // setLevelSelected={setLevelSelected}
              image={imgIcon}
              title="Inicial"
            />
            <LibraryCard
              // setLevelSelected={setLevelSelected}
              image={imgIcon}
              title="Primaria"
            />
            <LibraryCard
              // setLevelSelected={setLevelSelected}
              image={imgIcon}
              title="Secundaria"
            />
          </div>
        </div>

        <div className="my-books">
          {/* <h2>Mis libros {levelSelected !== "" ? `de ${levelSelected}` : '' }</h2> */}
          <h2>Mis libros</h2>
          <div className="books-container">
            {books &&
              // levelSelected !== "" &&
              books
                // .filter((book) => (book.book as Book).level === levelSelected)
                .map((book, index) => (
                  (book.book !== null) && (
                    <BookPortrait
                      key={index}
                      book={book}
                      bookName={`${(book.book as Book).name}`}
                      imgPortrait={libraryUrl.concat(
                        `${(book.book as Book).image}`
                      )}
                    />
                  )
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
