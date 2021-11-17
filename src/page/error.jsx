import React from "react"
import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div className="container">
      <Link to='/' className="back-home">
        Back to library
      </Link>
      <h1>This page not found</h1>
    </div>
  )
}
