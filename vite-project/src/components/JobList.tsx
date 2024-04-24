import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { fetchJob, setKeywordFilter, setCategoryFilter, resetFilter } from '../slice/jobSlice';
import search from "../images/search1.png"
import { useTheme } from './ThemeContext';
import { Job } from '../slice/jobSlice';


function JobList() {
  const { isDark } = useTheme()
  const dispatch = useDispatch();
  const job = useSelector((state: RootState) => state.job.job);
  const loading = useSelector((state: RootState) => state.job.loading);
  const error = useSelector((state: RootState) => state.job.error);
  const keywordFilter = useSelector((state: RootState) => state.job.filter.keyword);
  const categoryFilter = useSelector((state: RootState) => state.job.filter.category);

  useEffect(() => {
    dispatch(fetchJob());
  }, [dispatch]);

  const filteredJob = job.filter((job: Job) => {
    const keywordMatch = job.headline.toLowerCase().includes(keywordFilter.toLowerCase())
      || job.employer.name.toLowerCase().includes(keywordFilter.toLowerCase());

    const categoryMatch = categoryFilter === '' || job.occupation_field.label.toLowerCase() === categoryFilter.toLowerCase();
    return keywordMatch && categoryMatch;
  });

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeywordFilter(e.target.value));
  };
  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category));
  };

  const resetCategories = () => {
    dispatch(resetFilter());
  }

  return (
    <div className={`job-container ${isDark ? "dark" : "light"}`}>
    <div className="input-div">
    <input className={`input-field ${isDark ? "dark" : "light"}`}
      type="text" 
      placeholder="Search..." 
      value={keywordFilter}
      onChange={handleKeywordChange}
    />
    <img src={search} alt='search' className="search-image" />
  </div>
  
<div className='categories'>
  <button className={`${isDark ? "" : "light"}`} onClick={() => handleCategoryChange('Data/IT')}>Data/IT</button>
  <button className={`${isDark ? "" : "light"}`} onClick={() => handleCategoryChange('Hälso- och sjukvård')}>Hälso- och sjukvård</button>
  <button className={`${isDark ? "" : "light"}`} onClick={() => handleCategoryChange('Transport, distribution, lager')}>Transport, distribution, lager</button>
  <button className={`${isDark ? "" : "light"}`} onClick={() => handleCategoryChange('Pedagogik')}>Pedagogik</button>
  <button className={`${isDark ? "" : "light"}`} onClick={() => handleCategoryChange('Industriell tillverkning')}>Industriell tillverkning</button>
  <button className='btn-theme' onClick={() => resetCategories()}>Reset</button>
</div>

      <div>
        {loading ? (
          <p className='centered'>Loading...</p>
        ) : error ? (
          <p className='centered'>{error}</p>
        ) : (
          <>
          
          <ul>
            {filteredJob

            .map((job: Job, index: number) => (
              <li key={index} className={`job-item ${isDark ? "dark" : "light"}`}>
                <span><strong>Title:</strong> {job.headline}</span><br />
                <span><strong>Company:</strong> {job.employer.name}</span><br />
                <div className='description'><strong>Description:</strong> {job.description.text}
                </div>
                <span>...</span>
                <a className='more-info' href={job.webpage_url}>more info</a>
                <p><strong>Category:</strong> {job.occupation_field.label}</p>
                <p><strong>Heltid/Deltid:</strong> {job.working_hours_type.label}</p>
                <p><strong>Location:</strong> {job.workplace_address.municipality}</p><br />
              </li>
            ))}
          </ul>
          </>
        )}
      </div>
      </div>
    );
  }

export default JobList;












