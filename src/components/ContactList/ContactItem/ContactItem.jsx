import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.namesItem}>
      {name}
      <span className={css.colon}> : </span>
      <span className={css.numTel}>{number}</span>
      <button
        className={css.btn}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
