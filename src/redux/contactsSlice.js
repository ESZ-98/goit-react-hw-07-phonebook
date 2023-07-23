import { createSlice } from '@reduxjs/toolkit';
import operations from './operations';

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handlePartlyFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(operations.fetchDisplayContacts.pending, handlePending)
      .addCase(operations.fetchDisplayContacts.fulfilled, (state, action) => {
        handlePartlyFulfilled(state);
        state.contacts = action.payload;
      })
      .addCase(operations.fetchDisplayContacts.rejected, handleRejected)
      .addCase(operations.postContactOnList.pending, handlePending)
      .addCase(operations.postContactOnList.fulfilled, (state, action) => {
        handlePartlyFulfilled(state);
        state.contacts.push(action.payload);
      })
      .addCase(operations.postContactOnList.rejected, handleRejected)
      .addCase(operations.deleteContact.pending, handlePending)
      .addCase(operations.deleteContact.fulfilled, (state, action) => {
        handlePartlyFulfilled(state);
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(operations.deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
