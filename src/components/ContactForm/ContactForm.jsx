import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'redux/selectors';
import operations from 'redux/operations';
import { nanoid } from '@reduxjs/toolkit';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const doesContactExist = contacts.some(
      contact => contact.name === name || contact.number === number
    );
    if (doesContactExist) {
      alert(`Contact already exists!`);
    } else {
      let contact = { name: name, number: number, id: nanoid() };
      dispatch(operations.postContactOnList(contact));
    }
  };

  return (
    <form className={css.contact_form} onSubmit={handleSubmit}>
      <span className={css.contact_span}>Name</span>
      <input
        className={css.contact_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChange}
        required
      />
      <span className={css.contact_span}>Number</span>
      <input
        className={css.contact_input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleChange}
        required
      />
      <button className={css.contact_button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
