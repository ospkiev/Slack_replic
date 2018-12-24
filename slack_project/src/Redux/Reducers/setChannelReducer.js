import * as actionTypes from '../Actions/type';

const channel = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return action.data;
        default:
            return state
    }
}

export default channel;