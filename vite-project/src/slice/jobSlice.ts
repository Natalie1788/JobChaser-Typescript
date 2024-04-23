import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "../store/store";

export const fetchJob = createAsyncThunk<Job[], void>(
  'job/fetchJob',
  async () => {
    //const response = await fetch("https://jobsearch.api.jobtechdev.se/search?q=javascript&limit=100");
    const response = await fetch("https://jobsearch.api.jobtechdev.se/search?limit=100");
    if (!response.ok) {
      throw new Error('fetch error');
    }
    const data = await response.json();
    return data.hits;
  }
);

export interface Job {
    headline: string;
    employer: {
      name: string; 
    };
    description: {
      text: string; 
    };
    webpage_url: string; 
    occupation_field: {
      label: string; 
    };
    working_hours_type: {
      label: string;
    }
    workplace_address: {
      municipality: string;
    };
   
  }

export interface JobState {
    job: Job[],
    filteredJob: Job[],
    filter: {
      keyword: string,
      category: string
    },
    loading: boolean,
    error: null | string
  }

const initialState: JobState = {
  job: [],
  filteredJob: [],
  filter: {
    keyword: '',
    category: ''
  },
  loading: false,
  error: null
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setKeywordFilter: (state, action: PayloadAction<string>) => {
      state.filter.keyword = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload;
    },
    resetFilter: (state) => {
      state.filter.category = "",
      state.filter.keyword = ""
    }
    }, 
   
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchJob.pending, (state: JobState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJob.fulfilled, (state: JobState, action: any) => {
        state.loading = false;
        state.job = action.payload;
        state.filteredJob = action.payload;
      })
      .addCase(fetchJob.rejected, (state: JobState, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setKeywordFilter, setCategoryFilter, resetFilter } = jobSlice.actions;

export const selectLoading = (state: RootState) => state.job.loading;
export const selectError = (state: RootState) => state.job.error;

export default jobSlice.reducer;