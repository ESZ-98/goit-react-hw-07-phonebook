import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <label className={css.filter_label}>
      <span className={css.filter_name}>Find contacts by name</span>
      <input
        className={css.filter_input}
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
