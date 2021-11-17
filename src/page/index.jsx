import React, { useEffect, useState } from "react";
import Stack from "../sdk/entry";
import { useList } from "../hooks";
import Pagination from "../components/pagination";
import config from "../config/config";
import { GET_ALL_BOOKS } from "../graphql/queries";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

export default function Home() {
  const {
    loading,
    called,
    items,
    onNext,
    onPrev,
    isLastPage,
    isFirstPage
  } = useList(GET_ALL_BOOKS, {
    variables: {
      ...config.images.small
    }
  }, 'all_books');

  const [home_page, setHomePage] = useState({})

  useEffect(async () => {
    const home_page = await Stack.getEntry("home_page", "en-us")
    setHomePage(home_page[0][0])
  }, []);

  return (
    <main>
      <h1>{home_page.title}</h1>
      {(called && loading) && <Loader />}
      <div className='book-block'>
        {(!loading) && items.map(book => <BookCard key={book.url} book={book} />)}
      </div>
      <Pagination onNext={onNext} onPrev={onPrev} isFirstPage={isFirstPage} isLastPage={isLastPage} />
    </main>
  )
}
