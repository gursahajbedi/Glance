import { createContext, useEffect, useReducer } from "react";

export const Context=createContext({user:null})

const reducer=(state,action)=>{
    switch(action.type){
        case "login":
            return {user:action.payload}
        case "logout":
            return {user:null}
    }
}

// eslint-disable-next-line react/prop-types
export const ContextHandler=({children})=>{
    const [value,dispatch]=useReducer(reducer,{user:null})

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        dispatch({type:"login",payload:user})
    },[dispatch])

    console.log("AuthContext:",value)

    return(
        <Context.Provider value={{value,dispatch}}>
            {children}
        </Context.Provider>
    )
}