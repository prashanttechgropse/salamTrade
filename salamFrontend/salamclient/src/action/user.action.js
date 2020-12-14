import { userLoginAPI } from '../api/user.api'

export const UserFilters = {
    USER_LOGIN_PENDING: 'USER_LOGIN_PENDING',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_PROFILE_UPDATE: 'USER_PROFILE_UPDATE'
}

export const userLoginPending = () => ({
    type: UserFilters.USER_LOGIN_PENDING
})

export const userLoginCompleted = data => ({
    type: UserFilters.USER_LOGIN_SUCCESS,
    payload: data
})

export const userLoginFailed = (message) => ({
    type: UserFilters.USER_LOGIN_FAILED,
    message
})

export const userProfileUpdateSuccess = (data) => ({
    type: UserFilters.USER_PROFILE_UPDATE,
    payload: data
})

export const userProfileUpdateAction = (data) => {
    return dispatch => {
        dispatch(userProfileUpdateSuccess(data));
    }
}


export const userLoginAction = (data) => {
    return dispatch => {
        dispatch(userLoginPending())
        userLoginAPI('user/Login', data)
            .then(response => {
                console.log("object", response)
                if (response.data.status) {
                    dispatch(userLoginCompleted(response.data))
                } else {
                    dispatch(userLoginFailed(response.data.message))
                }
            })
            .catch(error => {
                dispatch(userLoginFailed('error'))
            })
    }
}
