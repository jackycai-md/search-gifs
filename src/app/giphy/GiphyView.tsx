import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import styles from './Giphy.module.css';
import { GiphySearchBar } from './GiphySearchBar';
import { GiphyContents } from './GiphyContents';
import { GiphyPagination } from './GiphyPagination';

const PAGE_LIMIT = 12;

export function GiphyView() {
  const totalCount = useAppSelector((state) => state.giphy.totalCount);
  const offset = useAppSelector((state) => state.giphy.offset);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.page}>
      <GiphySearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pageLimit={PAGE_LIMIT} />
      <GiphyContents searchTerm={searchTerm}/>
      {totalCount > 0 && <GiphyPagination
        totalCount={totalCount}
        offset={offset}
        countPerPage={PAGE_LIMIT}
        searchTerm={searchTerm}
      />}
    </div>
  );
}
