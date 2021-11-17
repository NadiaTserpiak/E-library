import React from "react"

export default function Pagination ({ onNext, onPrev, isFirstPage, isLastPage }) {
    return (
      <div className="pagination">
        <button onClick={onPrev} disabled={isFirstPage}>
          Prev
        </button>
        <button onClick={onNext} disabled={isLastPage}>
          Next
        </button>
      </div>
    )
}