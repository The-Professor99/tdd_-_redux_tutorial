import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

// import { routerReducer } from "react-router-redux";
// import { applyMiddleware, createStore, compose } from "redux";
// import thunk from "redux-thunk";

// import { reducer } from "./redux/reducers/reducer";
import errors from "./redux/reducers/ErrorInterceptor/error";
import books from "./redux/reducers/books";
import details from "./redux/reducers/details";
import search from "./redux/reducers/search";

const initialState = {};
// const middlewares = [thunk];

// const composedEnhancers = compose(applyMiddleware(...middlewares));

// const store = createStore(reducer, initialState, composedEnhancers);
// const rootReducer = combineReducers({
//   routing: routerReducer,
//   reducer,
//   errors,
// });
const combinedReducer = {
  books: books,
  details: details,
  search: search,
  errors: errors,
};
const store = configureStore({
  reducer: combinedReducer,
  preloadedState: initialState,
});

// console.log(store.getState());
export default store;
