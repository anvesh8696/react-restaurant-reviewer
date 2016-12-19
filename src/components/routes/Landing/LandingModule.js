import { handleActions, createAction } from 'redux-actions';
import Yelp from 'api/Yelp';
import { map, orderBy, filter, delay, dropRight, concat } from 'lodash';
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
    const { term, loc, popular, good, asc, reviews } = getState()[LANDING_STATE];
    
    yelp.search({ term: term, location: loc, category:'food,restaurants'})
    .then(function (data) {
      return map(data.businesses, (d) => d.id);
    })
    .then(yelp.business)
    .then((data) => {
      
      let found = map(data, (d) => {
        return {
          id: d.id,
          thumb: d.image_url,
          name: d.name,
          rating: d.rating,
          reviews: concat(d.reviews, filter(reviews, { id: d.id})),
          city: d.location.city,
          state: d.location.state_code,
          postal: d.location.postal_code,
          street: d.location.address[0],
          displayAddress: d.location.display_address.join(' ')
        };
      });
      
      // update the view
      dispatch(onChange({
        results: filterModel(popular, good, asc, found),
        model: found
      }));
    })
    .catch(function (err) {
      console.error('yelp.search error', err);
    });
  };
}

const filterModel = (popular, stars, asc, data) => {
  if(stars){
    data = filter(data, (o) => { return o.rating >= 4; });
  }
  
  if(popular){
    data = asc ? orderBy(data, ['rating','name'], ['desc','asc']) : orderBy(data, ['rating'], ['desc']);
    data = dropRight(data, data.length > 10 ? data.length - 10 : 0);
  } else if(asc){
    data = orderBy(data, ['name'], ['asc']);
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
  asc: false,
  results: [],
  model: [],
  reviews: []
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
      delay(() => dispatch(search()), 100);
    });
  });
} else {
  delay(() => dispatch(search()), 100);
}

// ------------------------------------
// Reducer
// ------------------------------------
export const landingReducer = handleActions({
  [ON_CHANGE]: (state, action) => ({...state, ...action.payload}),
  [ON_FILTER_UPDATE]: (state, action) => {
    const { popular, good, asc, model } = state;
    return {...state, results: filterModel(popular, good, asc, model)};
  }
}, initialState);

export default landingReducer;
