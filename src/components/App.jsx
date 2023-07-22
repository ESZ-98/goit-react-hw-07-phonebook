import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import selectors from '../redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);
  const filter = useSelector(selectors.getFilter);

  const submitForm = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };

    if (contacts.some(contact => name === contact.name)) {
      alert(`{$name} is already in contacts.`);
      return;
    }

    dispatch(setFilter(newContact));
  };

  const changeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  const deleteContact = id => {
    dispatch(deleteContacts(id));
  };

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        paddingLeft: '20px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={submitForm} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts(contacts, filter)}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
