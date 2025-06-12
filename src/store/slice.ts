import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { userinterface } from '../Types/Interfaces';
import { getAllGroups } from '../services/supabase';

export interface UserState {
    user: userinterface,
    userGroups: unknown[],
    otherGroups: unknown[],
    joinedGroups: unknown[]
}

const initialState: UserState = {
    user: {
        id: 0,
        user_name: '',
        user_genre: '',
        user_danceability: 0,
        user_energy: 0,
        user_instrumentalness: 0,
        user_speechiness: 0,
        user_tempo: 0
    },
    userGroups: [],
    otherGroups: [],
    joinedGroups: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    setGroups: (state, action) => {
        state.userGroups = action.payload.userGroups || [];
        state.otherGroups = action.payload.otherGroups || [];
        state.joinedGroups = action.payload.joinedGroups || [];
    }
  },
})

export const { setUser, setGroups } = userSlice.actions

export const getGroups = createAsyncThunk('user/getGroups', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const username = state.user.user.user_name;
    const groups = await getAllGroups(username);
    thunkAPI.dispatch(setGroups(groups));
});

export default userSlice.reducer