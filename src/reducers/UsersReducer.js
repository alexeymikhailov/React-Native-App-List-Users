import {
  REQUEST_USERS_DATA,
  RECEIVE_USERS_DATA,
  REQUEST_USERS_DATA_FAILED,
  SET_CURRENT_USER
} from '../actions';

const initialState={
  page: 1,
  currentUser: '',
  usersData: [],
  loadingData: false,
  errorUsersData: ''
};

const usersReducer=(state=initialState, action) => {
  switch(action.type) {
    case REQUEST_USERS_DATA:
      return {
        ...state,
        loadingData: true
      };

    case RECEIVE_USERS_DATA:
      return {
        ...state,
        page: state.page + 1,
        usersData: [...state.usersData, ...action.data],
        loadingData: false
      };

    case REQUEST_USERS_DATA_FAILED:
      return {
        ...state,
        errorUsersData: action.error,
        loadingData: false
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }

    default:
      return state;
  }
};

export default usersReducer;
