import { useSearchParams } from 'react-router-dom';

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (event) => {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select onChange={handleChange} value={sortBy}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={sortBy === option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
