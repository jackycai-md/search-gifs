import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { Row, Col } from 'react-bootstrap';
import styles from './Giphy.module.css';
import { GiphyImage } from './GiphyImage';

interface GiphyContentsProps {
  searchTerm: string;
}

export function GiphyContents({ searchTerm }: GiphyContentsProps) {
  const results = useAppSelector((state) => state.giphy.results);
  const status = useAppSelector((state) => state.giphy.status);
  const errorMessage = useAppSelector((state) => state.giphy.errorMessage);

  return (
    <div className={styles.contents}>
        {searchTerm
          ? <p className={styles.hint}>Search Results for: "{searchTerm}"</p>
          : null}
        {status === 'failed' && <p className={styles.error}>Error: {errorMessage}</p>}
        <Row>
          {results.map((r) => (
            <Col key={r.id} md={3} sm={6}>
              <GiphyImage key={r.id} url={r.images.fixed_width.url} />
            </Col>
          ))}
        </Row>
    </div>
  );
}
