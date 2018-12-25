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

export const setCurrentChannel = channel => ({
    type: actionTypes.SET_CURRENT_CHANNEL,
    data: channel,
})

export const setPrivatChannel = isPrivatChannel => ({
    type: actionTypes.SET_PRIVAT_CHANNEL,
    data: isPrivatChannel,
})