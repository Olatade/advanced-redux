import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  // works with createAsyncThunk
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Immer lets us update state in two ways: either mutating the existing state value, or returning a new result. If we return a new value, that will replace the existing state completely with whatever we return.
      // whatever we return will be the new state
      return action.payload
    })
  },
})

export const selectAllUsers = (state) => state.users

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)

export default usersSlice.reducer
