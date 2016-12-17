import { handleActions, createAction } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const ON_CHANGE = 'ON_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export const onChange = createAction(ON_CHANGE);

// ------------------------------------
// ASYNC Actions
// ------------------------------------


export const actions = {
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  search: '',
  loc: '',
  open: true,
  group: false,
  outdoor: false,
  results: [
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    },
    {
      avatar: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      caption: 'Taco Shack',
      legend: 'Open Now (3 miles away)'
    }
  ]
};

// ------------------------------------
// Reducer
// ------------------------------------
export const landingReducer = handleActions({
  [ON_CHANGE]: (state, action) => ({...state, ...action.payload})
}, initialState);

export default landingReducer;
