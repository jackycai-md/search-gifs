import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchGifs, GiphyData } from './giphyAPI';

export interface GiphyState {
  results: GiphyData[];
  offset: number;
  totalCount: number;
  errorMessage: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GiphyState = {
  results: [],
  offset: 0,
  totalCount: 0,
  status: 'idle',
  errorMessage: ''
};

export const searchGiphyAsync = createAsyncThunk(
  'giphy/search',
  async ({ searchTerm, offset, pageLimit }: { searchTerm: string, offset: number, pageLimit: number }) => {
    return fetchGifs(searchTerm, offset, pageLimit);
  }
);

export const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
    .addCase(searchGiphyAsync.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(searchGiphyAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.results = action.payload.data;
      state.offset = action.payload.pagination.offset;
      state.totalCount = action.payload.pagination.total_count;
    })
    .addCase(searchGiphyAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.errorMessage = action.error.message || 'Failed to load GIFs';
    })
  },
});

export default giphySlice.reducer;
