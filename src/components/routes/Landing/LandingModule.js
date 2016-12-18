import { handleActions, createAction } from 'redux-actions';
import Yelp from 'api/Yelp';
import { map, sortBy, filter } from 'lodash';
import { dispatch } from 'components/App';

// ------------------------------------
// Constants
// ------------------------------------
const LANDING_STATE = 'landing';	
const yelp = new Yelp(
  'Yekso-Yjl_BOheqCw4Zjzw',
  'l6RriBiVZPgoboI3IuZHS0Y1nwM',
  'nUF3gUpllZ_pNBg893SaJgc7w5zlgh_P',
  'sqN82_yPL7LEpCiN0mjEFj8F4jQ'
);


export const ON_CHANGE = 'ON_CHANGE';
export const ON_FILTER_UPDATE = 'ON_FILTER_UPDATE';

// ------------------------------------
// Actions
// ------------------------------------
export const onChange = createAction(ON_CHANGE);

export const onFilterUpdate = createAction(ON_FILTER_UPDATE);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function search() {
  return function (dispatch, getState) {
    const { term, loc, popular, good, closed } = getState()[LANDING_STATE];
    
    yelp.search({ term: term, location: loc, category:'food,restaurants'})
    .then(function (data) {
      console.log(data);
      // format
      return map(data.businesses, (d) => {
        return {
          id: d.id,
          thumb: d.image_url,
          name: d.name,
          rating: d.rating,
          reviews: d.review_count,
          city: d.location.city,
          state: d.location.state_code,
          postal: d.location.postal_code,
          street: d.location.address[0]
        };
      });
      
      //return map(found, (d) => d.id);
    })
    //.then(yelp.business)
    .then((data) => {
      
      // update the view
      dispatch(onChange({
        results: filterModel(popular, good, closed, data),
        model: data
      }));
    })
    .catch(function (err) {
      console.error('yelp.search error', err);
    });
  };
}

const filterModel = (popular, stars, closed, data) => {
  if(popular){
    data = sortBy(data, ['popular', 'stars']);
  }
  if(stars){
    data = filter(data, (o) => { return o.rating >= 4; });
  }
  if(closed){
    data = filter(data, (o) => { return o.closed === true; });
  }
  return data;
};

export const actions = {
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  term: 'pizza',
  geo: {city: 'Mountain View', state: 'CA', postal: '94041'},
  loc: 'Mountain View, CA',
  popular: true,
  good: false,
  closed: false,
  results: [],
  model: []
};

// attempt to autofill location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    let {latitude, longitude} = coords;
    yelp.whereAmI(latitude, longitude)
    .then((response) => {
      if(response != null){
        let {city, state} = response;
        dispatch(onChange({geo: response, loc: `${city}, ${state}`}));
      }
    });
  });
}

// ------------------------------------
// Reducer
// ------------------------------------
export const landingReducer = handleActions({
  [ON_CHANGE]: (state, action) => ({...state, ...action.payload}),
  [ON_FILTER_UPDATE]: (state, action) => {
    const { popular, good, closed, model } = state;
    return {...state, results: filterModel(popular, good, closed, model)};
  }
}, initialState);

export default landingReducer;
