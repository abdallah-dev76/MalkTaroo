import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileState = {
  firstName: string;
  lastName: string;
  birthdate: string;
  isOnboarded: boolean;
};

const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  birthdate: '',
  isOnboarded: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        birthdate: string;
      }>,
    ) => {
      const { firstName, lastName, birthdate } = action.payload;

      state.firstName = firstName.trim();
      state.lastName = lastName.trim();
      state.birthdate = birthdate;
      state.isOnboarded = true;
    },
    clearProfile: state => {
      state.firstName = '';
      state.lastName = '';
      state.birthdate = '';
      state.isOnboarded = false;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
