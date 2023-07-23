export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

const getContacts = state => state.contacts.contacts;
const getFilter = state => state.filter;

const selectors = { getContacts, getFilter };

export default selectors;
