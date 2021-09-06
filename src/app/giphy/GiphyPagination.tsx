import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Pagination } from 'react-bootstrap';
import { searchGiphyAsync } from './giphySlice';
import { getTotalPageNumber, generatePages } from './paginationUtils';

interface GiphyPaginationProp {
  totalCount: number;
  offset: number;
  countPerPage: number;
  searchTerm: string;
}

export function GiphyPagination({
  totalCount,
  offset,
  countPerPage,
  searchTerm
}: GiphyPaginationProp) {
  const dispatch = useAppDispatch();

  const onPageClick = (page: number) => {
    dispatch(searchGiphyAsync({ searchTerm, offset: (page  - 1) * countPerPage, pageLimit: countPerPage }));
  };

  const totalPageNum = getTotalPageNumber(totalCount, countPerPage);
  const curPageNum = Math.floor(offset/countPerPage) + 1;
  const availablePages = generatePages(totalPageNum, curPageNum);

  return (
    <Pagination>
      <Pagination.First disabled={curPageNum === 1} onClick={() => onPageClick(1)}/>
      <Pagination.Prev disabled={curPageNum === 1} onClick={() => onPageClick(curPageNum - 1)}/>
      {availablePages[0] > 1 && <Pagination.Ellipsis disabled/>}
      {availablePages.map((p) => (
        <Pagination.Item
          key={p}
          active={p === curPageNum}
          onClick={() => onPageClick(p)}
        >
          {p}
        </Pagination.Item>
      ))}
      {availablePages[availablePages.length - 1] < totalPageNum && <Pagination.Ellipsis disabled/>}
      <Pagination.Next disabled={curPageNum === totalPageNum} onClick={() => onPageClick(curPageNum + 1)}/>
      <Pagination.Last disabled={curPageNum === totalPageNum} onClick={() => onPageClick(totalPageNum)}/>
    </Pagination>
  );
}
