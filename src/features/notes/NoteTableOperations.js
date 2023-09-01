import SortBy from '../../components/SortBy';
import FilterDropdown from '../../components/FilterDropdown.js';

function BookingTableOperations() {
  return (
    <div className="d-flex justify-content-between pb-4">
      <FilterDropdown
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'open', label: 'Open' },
          { value: 'closed', label: 'Closed' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'createdAt-desc',
            label: 'Sort by date created (recent first)',
          },
          {
            value: 'createdAt-asc',
            label: 'Sort by date created (earlier first)',
          },
        ]}
      />
    </div>
  );
}

export default BookingTableOperations;
