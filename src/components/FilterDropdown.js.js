import { useSearchParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default function FilterDropdown({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="filter-dropdown"
        size="sm"
        title={currentFilter}
      >
        {currentFilter}
      </Dropdown.Toggle>
      <Dropdown.Menu className="rounded-0">
        {options.map((option) => (
          <Dropdown.Item
            active={currentFilter === options.value}
            value={option.value}
            onClick={() => handleClick(option.value)}
            key={option.value}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
