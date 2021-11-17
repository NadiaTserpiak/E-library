import React from "react";
import { Link } from "react-router-dom";
import { getBookPath, getMainImageUrl } from "../helpers";

export default function BookCard({ book }) {
  return (
    <Link to={getBookPath(book)} className="book-card">
      <img src={getMainImageUrl(book)} />
      <h4>{book.title}</h4>
    </Link>
  )
}