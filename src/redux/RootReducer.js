const initialState = {
  user: {},
  isLoggedIn: false,
  type: 'doctor',
  isDarkTheme: false,
  language: 'en',
};

export const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      state.language = action.payload;
      return {...state, language: state.language};
    case 'SET_TYPE':
      state.type = action.payload;
      return {...state, type: state.type};
    case 'SET_DARK_THEME':
      state.isDarkTheme = action.payload;
      return {
        ...state,
        theme: state.isDarkTheme,
      };
    case 'SET_USER':
      state.user = action.payload;
      state.isLoggedIn = true;
      return {
        ...state,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      };
    case 'LOGOUT':
      state.user = {};
      state.isLoggedIn = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};
