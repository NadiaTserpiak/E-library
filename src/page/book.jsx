import Stack from "../sdk/entry"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import config from "../config/config";
import Loader from "../components/Loader";

export default function Book() {
  const { bookUrl } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const book = await Stack.getSpecificEntry("books", bookUrl, "en-us")
    if (book.length) {
      setBook(book[0]);
    }
    setLoading(false);
  }, []);

  return (
    <div className="container" >
      <Link to='/' className="back-home">
        Back to library
      </Link>
      {loading && <Loader />}
      {!loading && book && <div className="book-page">
          <img src={book?.cover_image?.url || config.defaultImages.small} />
          <div>
            <h2> {book.title} </h2>
            <p> {book.description} </p>
            <h4> Author is {book.author} </h4>
            <p>Number of pages: {book.number_of_pages} </p>
            <a href={book?.buying_link?.href} target="_blank" className="buy-link">
              {book?.buying_link?.title}
            </a>
          </div>
        </div>
      }
      {!loading && !book && <h1>Not found</h1> }
    </div>
  )
}