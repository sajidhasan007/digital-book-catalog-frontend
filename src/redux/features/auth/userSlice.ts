import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  accessToken: string;
}

const initialState: IUser = {
  accessToken: '',
};

const userSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
