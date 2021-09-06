import React from 'react';
import styles from './Giphy.module.css';

export function GiphyImage({ url }: { url: string }) {
  return (
    <img 
      src={url}
      className={styles.image}
      alt="loading..." />
  );
}
