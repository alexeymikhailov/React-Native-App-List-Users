export const REQUEST_USERS_DATA='REQUEST_USERS_DATA';
export const RECEIVE_USERS_DATA='RECEIVE_USERS_DATA';
export const REQUEST_USERS_DATA_FAILED='REQUEST_USERS_DATA_FAILED';
export const SET_CURRENT_USER='SET_CURRENT_USER';

const requestUsersData=() => {
  return {
    type: REQUEST_USERS_DATA
  };
};

const receiveUsersData=(data) => {
  return {
    type: RECEIVE_USERS_DATA,
    data
  };
};

const requestUsersDataFailed=(error) => {
  return {
    type: REQUEST_USERS_DATA_FAILED,
    error
  };
};

export const setCurrentUser=(user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const fetchUsersData=() => {
  return async (dispatch, getState) => {
    dispatch(requestUsersData());

    const { page }=getState().UsersReducer;
    const url=`https://randomuser.me/api/?page=${page}&results=25`;

    try {
      const response=await fetch(url);
      const json=await response.json();

      let arrResponseResultsUsers=json.results.map((item) => {
        return item;
      });

      dispatch(receiveUsersData(arrResponseResultsUsers));
    } catch(error) {
      dispatch(requestUsersDataFailed(error));
    }
  };
};
