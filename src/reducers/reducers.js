import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

function visibilityFilter(state = '', action) {
  switch (action.type){
    case SET_FILTER:
       return action.value;
    
    default: 
       return state;
  }
}

function movies(state = [], action){
  switch (action.type) {
    case SET_MOVIES:
       return action.value;
    default:
       return state;
  }
}

/* Combined reducer that splits into two smaller reducers. */

// function moviesApp( state = {}, action){
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

/* more elegantly, we use the built-in redux function 'combineReducers()', but it means the same than before */

const movieApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;