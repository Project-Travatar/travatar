import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null, // may need to change to user ? user : null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// helper functions
const authService = {
  register: async (user) => {
    const response = await fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    // console.log('Successful response from server received:', response);
    const data = await response.json();
    // console.log('Parsed response from server:', data);
    localStorage.setItem('userToken', data.token);
    return data;
  },

  login: async (user) => {
    const response = await fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    // console.log('Successful response from server received', response);
    const data = await response.json();
    // console.log('Parsed response from server:', data);
    localStorage.setItem('userToken', data.token);
    return data;
  },
};

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      // console.log('Request received from register component:', user)
      const response = await authService.register(user);
      // console.log('response from authService.register:', response);
      return response;
    } catch (error) {
      console.error(error);
      const message =
      error?.response?.data?.message ||
      error.message ||
      error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      // console.log('Request received from login component:', user);
      const response = await authService.login(user);
      // console.log('response from authService.login:', response);
      return response;
    } catch (error) {
      const message = error?.response?.data?.message ||
      error.message ||
      error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userToken');
});

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    loginUserSync: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
})

export const { resetUser, loginUserSync } = userSlice.actions;
export default userSlice.reducer;