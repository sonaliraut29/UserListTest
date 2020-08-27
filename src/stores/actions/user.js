import {
    ADD_USER,
    USER_LIST,
    LOGIN_TYPE
} from './types';

export const loginUserAs = (type) => {
    return (dispatch) => {
        dispatch(asyncLoginAs(type));
    }
}

export const asyncLoginAs = (type) => {
    return {
        type: LOGIN_TYPE,
        addType : type
    }
}

export const getUserList = (usersData) => {
    return (dispatch) => {
		dispatch(asyncUserList()); 
	}
}

export const AddUser = (data) => {
    console.log(data);
    return (dispatch) => {
		dispatch(asyncAddUser(data, data.addType));
	}
}

export const asyncAddUser = (usersData, addType) => {
    return{
        loading :  false,
        payload : usersData,
        type    : ADD_USER,
        addType : addType
    }
}

export const asyncUserList = () => {
    return {
		type    : USER_LIST,
		loading : false,
	}
}
