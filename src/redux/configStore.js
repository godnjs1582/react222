import {createStore, combineReducers,applyMiddleware,compose} from "redux";
import word from "./modules/word";
import thunk from "redux-thunk";

const rootReducer=combineReducers({word});
const middlewares=[thunk];
const enhancer =applyMiddleware(...middlewares);
const store =createStore(rootReducer,enhancer);

export default store;