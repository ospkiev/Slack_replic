import * as actionTypes from './type';

export const setUser = user => ({
    type: actionTypes.SET_USER,
    data: {
        currentUser: user,
    }
})

export const signOutUser = () => ({
    type: actionTypes.SIGNOUT_USER,
    data: {
        currentUser: null,
        isLoading: false,
    }
})
