import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onFilterChange, filter }) => {
  return (
    <div>
      <label className={css.filterLabel}>
        Find contacts by name
        <input
          className={css.filterInput}
          onChange={onFilterChange}
          value={filter}
          type="text"
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
