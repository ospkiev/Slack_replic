// import React from 'react';
import * as actionTypes from '../Actions/type';

const setColorsReducer = (state = [{ colorPrim: '#4c3c4c', colorSec: '#eee' }], action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return {
                colors: action.data,
            }
        default:
            return state
    }
};

export default setColorsReducer;