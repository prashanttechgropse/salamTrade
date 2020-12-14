function authenticate(resp) {
    return dispatch => {
        dispatch({
            type: 'authenticate',
            userId: resp.payload.userId,
            firstName: resp.payload.firstName,
            lastName: resp.payload.lastName,
            email: resp.payload.email,
            Type: resp.payload.accountType,
            mobile: resp.payload.mobile,
            gender: resp.payload.gender,
            dob: resp.payload.dob,
            streetAddress: resp.payload.streetAddress,
            zipcode: resp.payload.zipcode,
            city: resp.payload.city,
            state: resp.payload.state,
            country: resp.payload.country
        })
    }
}

export default {
    authenticate
}