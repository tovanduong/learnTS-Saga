import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { ChangeEvent } from 'react';
import './search.scss';

export interface SearchProps {
  onSubmit: (value: string) => void;
}

const Search = ({ onSubmit }: SearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSubmit(searchTerm);
  };

  return (
    <div className="SearchForm">
      <input
        name="search"
        type="text"
        onChange={(event) => handleChange(event)}
        placeholder="search item"
        className="SearchForm-Input"
        autoComplete="off"
      />
      <button type="submit" className="SearchForm-btn">
        <SearchOutlinedIcon />
      </button>
    </div>
  );
};

export default Search;
