import {
  useQuery
} from "@apollo/client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Pagination from "./components/pagination";
import config from "./config/config";

export const useList = (query, options, listKey) => {
  const [limit] = useState(config.pagination.limit)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);

  const onNext = useCallback(() => {
    if (total > skip + limit) setPage(page + 1)
  });

  const onPrev = useCallback(() => {
    if (page > 1) setPage(page - 1)
  });

  const skip = useMemo(() => {
    return limit * (page - 1);
  }, [limit, page])

  const localOptions = useMemo(() => {
    return {
      ...options,
      variables: {
        ...options.variables,
        skip,
        limit,
      }
    }
  }, [options]);

  const { loading, called, data } = useQuery(query, localOptions);

  useEffect(() => {
    setTotal(data?.[listKey]?.total || 0)
    setItems(data?.[listKey]?.items || [])
  }, [data]);

  useEffect(() => {
    setIsFirstPage(page <= 1);
    setIsLastPage(total <= skip + limit);
  }, [skip, limit, total]);

  return {
    items,
    limit,
    total,
    page,
    skip,
    loading,
    called,
    isLastPage,
    isFirstPage,
    Pagination: (<Pagination onNext={onNext} onPrev={onPrev} isFirstPage={isFirstPage} isLastPage={isLastPage} />),

    onNext,
    onPrev,
  }
}
