import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const LOCAL_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem(LOCAL_KEY);
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const contactPresent = this.state.contacts.filter(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (contactPresent.length) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(el => el.id !== contactId),
    });
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { onAddContact, deleteContact, onFilterChange } = this;
    const { filter } = this.state;
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div className={css.mainSection}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={onAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    );
  }
}
//
