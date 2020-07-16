import { combineReducers } from "redux";
import authReducer from './auth.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;