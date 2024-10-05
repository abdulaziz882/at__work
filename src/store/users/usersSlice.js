import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: 'Активные', 
  users: [],  
  user: null,
};


export const getAllUsers = createAsyncThunk('usersSlice/getAllUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6'); 
  const data = await res.json();
  return data;
});

export const getUser = createAsyncThunk('usersSlice/getUser', async (id) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();
  return data;
});

export const updateUser = createAsyncThunk('usersSlice/updateUser', async (user) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json(); 
  return data; 
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload; 
            const userIndex = state.users.findIndex(u => u.id === updatedUser.id);

            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser; 
            }
            state.user = updatedUser; 
        });
  },
});

export default usersSlice.reducer;
