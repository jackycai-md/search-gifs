import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAppDispatch } from '../redux/hooks';
import { searchGiphyAsync } from './giphySlice';
import styles from './Giphy.module.css';

interface GiphySearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  pageLimit: number;
}

export function GiphySearchBar({
  searchTerm,
  setSearchTerm,
  pageLimit
}: GiphySearchBarProps) {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInput && searchInput !== searchTerm) {
      setSearchTerm(searchInput);
      dispatch(searchGiphyAsync({ searchTerm: searchInput, offset: 0, pageLimit }));
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row className={styles.row}>
        <Col sm={10}>
          <Form.Group controlId="searchInput">
            <Form.Label>Search GIFs</Form.Label>
            <Form.Control type="text" placeholder="Enter any keyword to search GIFs" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Button className={`${styles.button}`} variant="primary" type="submit" disabled={!searchInput}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
