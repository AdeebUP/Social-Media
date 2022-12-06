import * as AuthApi from '../api/AuthRequest.js'

export const logIn = (formData) => async (dispach) => {
    dispach({type: "AUTH_START"})
    try {
        const { data } = await AuthApi.logIn(formData)
        dispach({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispach({type: "AUTH_FAIL"})
    }
}

export const signUp = (formData) => async (dispach) => {
    dispach({type: "AUTH_START"})
    try {
        const { data } = await AuthApi.signUp(formData)
        dispach({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispach({type: "AUTH_FAIL"})
    }
}

export const logOut = () => async(dispatch) => {
    dispatch({type: "LOG_OUT"})
}