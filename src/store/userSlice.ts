import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { login, signup } from 'api/usersApi'

export type User = {
   email: string | null,
   token: string | null,
   id: string | null
}

export type UserState = {
   user: User,
   loading: boolean,
   error: string | null
}

const initialState: UserState = {
   user: {
      email: null,
      token: null,
      id: null
   },
   loading: false,
   error: null
}

export const userLogin = createAsyncThunk<User, { email: string, password: string }, { rejectValue: string }>(
   'user/userLogin',
   async function ({ email, password }, { rejectWithValue }) {
      console.log('thunk')
      const { user } = await login(email, password)
      console.log(user)
      if (!user) {
         return rejectWithValue('Server Error')
      }
      return {
         email: user.email,
         token: user.refreshToken,
         id: user.uid
      }
   }
)

export const userSignUp = createAsyncThunk<User, { email: string, password: string }, { rejectValue: string }>(
   'user/userSignUp',
   async function ({ email, password }, { rejectWithValue }) {
      const { user } = await signup(email, password)
      if (!user) {
         return rejectWithValue('Server Error')
      }
      return {
         email: user.email,
         token: user.refreshToken,
         id: user.uid
      }
   }
)

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      removeUser(state) {
         state.user.email = null;
         state.user.token = null;
         state.user.id = null;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(userLogin.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(userLogin.fulfilled, (state, action) => {
            state.user.email = action.payload.email;
            state.user.token = action.payload.token;
            state.user.id = action.payload.id;
            console.log(action.payload)
            console.log(state.user.email)
            console.log(state.user.token)
            console.log(state.user.id)
            state.loading = false;
         })
         .addCase(userSignUp.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(userSignUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
         })
         .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
         });
   },
})

function isError(action: AnyAction) {
   return action.type.endsWith('rejected');
}

export const { removeUser } = userSlice.actions
export default userSlice.reducer
