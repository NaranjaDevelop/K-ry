import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Group, userinterface } from '../Types/Interfaces';
import { getAllGroups } from '../services/supabase';

export interface UserState {
    user: userinterface,
    userGroups: Group[],
    otherGroups: Group[],
    joinedGroups: Group[]
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
        user_tempo: 0,
        user_loudness: 0,
        user_explicit: false,
        user_groups: [],
        user_email: '',
        user_favorites: []
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
        state.user = {
            ...state.user,
            user_name: action.payload.username || '',
            user_email: action.payload.email || '',
        };
    },
    setGroups: (state, action) => {
        state.userGroups = action.payload.userGroups || [];
        state.otherGroups = action.payload.otherGroups || [];
        state.joinedGroups = action.payload.joinedGroups || [];
    },
    insertGroup: (state, action) => {
        const newGroup = action.payload;

        if (newGroup.users[0] === state.user.user_name) {
            state.userGroups.push(newGroup);
        } else if (newGroup.users.includes(state.user.user_name)) {
            state.joinedGroups.push(newGroup);
        } else {
            state.otherGroups.push(newGroup);
        }
    },
    updateGroup: (state, action) => {
        const updatedGroup = action.payload;
        const groupIndex = state.userGroups.findIndex(group => group.id === updatedGroup.id);

        if (groupIndex !== -1) {
            state.userGroups[groupIndex] = updatedGroup;
        } else {
            const joinedIndex = state.joinedGroups.findIndex(group => group.id === updatedGroup.id);
            if (joinedIndex !== -1) {
                state.joinedGroups[joinedIndex] = updatedGroup;
            } else {
                const otherIndex = state.otherGroups.findIndex(group => group.id === updatedGroup.id);
                if (otherIndex !== -1) {
                    state.otherGroups[otherIndex] = updatedGroup;
                }
            }
        }
    }
  },
})

export const { setUser, setGroups, insertGroup, updateGroup } = userSlice.actions

export const getGroups = createAsyncThunk('user/getGroups', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const username = state.user.user.user_name;
    const groups = await getAllGroups(username);
    thunkAPI.dispatch(setGroups(groups));
});

export default userSlice.reducer