import axios from 'axios';
import { AxiosResponse } from 'axios';
import { API_KEY } from '../constants';

export interface GiphyResponse {
  data: GiphyData[];
  pagination: Pagination;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GiphyData {
  id: string;
  url: string;
  images: GiphyImages;
}

export interface GiphyImages {
  original: ImageSource;
  preview: ImageSource;
  fixed_width: ImageSource;
}

export interface ImageSource {
  url: string;
}

export async function fetchGifs(queryTerm: string, offset: number = 0, pageLimit: number = 8) {
  return axios.get(`https://api.giphy.com/v1/gifs/search?q=${queryTerm}&limit=${pageLimit}&offset=${offset}&api_key=${API_KEY}`)
      .then((res: AxiosResponse) => res.data as GiphyResponse );
}
