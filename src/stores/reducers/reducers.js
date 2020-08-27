import React from 'react';
import { combineReducers } from 'redux';
import userReducer from './usersReducer';

const reducers = combineReducers({
    User: userReducer
});

export default reducers;