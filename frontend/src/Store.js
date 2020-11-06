import React, { createContext, useReducer, useContext } from 'react';
import { getStorageItem, setStorageItem } from 'utils/useLocalStorage';
import useReducerWithSideEffects, { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';


const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;
    if (type === SET_TOKEN) {
        const { payload: jwtToken } = action;
        const newState = { ...prevState, jwtToken };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('jwtToken', jwtToken);
        })
    }
    else if (type === DELETE_TOKEN) {
        const newState = { ...prevState, jwtToken: '' };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('jwtToken', '');
        })
    }
    return prevState;
}

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        jwtToken: getStorageItem('jwtToken', '')
    });
    return (
        <AppContext.Provider value={{ store, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

//action
const SET_TOKEN = 'APP/SET_TOKEN';
const DELETE_TOKEN = 'APP/DELETE_TOKEN';

//action creators
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });