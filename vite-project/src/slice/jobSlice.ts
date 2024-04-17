import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    headline: string; // Название вакансии
    employer: {
      name: string; // Название компании
    };
    description: {
      text: string; // Описание вакансии
    };
    webpage_url: string; // URL веб-страницы с дополнительной информацией о вакансии
    occupation_field: {
      label: string; // Область деятельности
    };
    working_hours_type: {
      label: string; // Тип рабочих часов (полный рабочий день, частичная занятость и т. д.)
    };
    workplace_address: {
      municipality: string; // Муниципалитет, где находится место работы
    };
    // Другие поля, если они присутствуют
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
    }
    }, 
   
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
        state.filteredJob = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setKeywordFilter, setCategoryFilter } = jobSlice.actions;

export const selectLoading = state => state.job.loading;
export const selectError = state => state.job.error;

export default jobSlice.reducer;