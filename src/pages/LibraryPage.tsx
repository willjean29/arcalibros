import React, { useEffect, useState } from "react";
import LibraryCard from "../components/library/LibraryCard";

import imgBooks from "../assets/icons/booksv2.svg";
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

        {/* <div className="level-course-container">
          <h2>Selecciona tu nivel educativo</h2>
          <div className="three-components">
            <LibraryCard
              image={imgIcon}
              title="Inicial"
            />
            <LibraryCard
              image={imgIcon}
              title="Primaria"
            />
            <LibraryCard
              image={imgIcon}
              title="Secundaria"
            />
          </div>
        </div> */}

        <div className="my-books">
          {/* <h2>Mis libros {levelSelected !== "" ? `de ${levelSelected}` : '' }</h2> */}
          <h1>Mis libros</h1>
          <div className="books-container">
            {books.length > 1 ? (
              books.map(
                (book, index) =>
                  book.book !== null && (
                    <BookPortrait
                      key={index}
                      book={book}
                      bookName={`${(book.book as Book).name}`}
                      imgPortrait={libraryUrl.concat(
                        `${(book.book as Book).image}`
                      )}
                    />
                  )
              )
            ) : (
              <div className="no-books">
                <img src={imgBooks} alt=""/>
                <h2>Aún no hay libros</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
