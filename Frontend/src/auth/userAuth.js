const USER_KEY = "userSession";

export const loginUser = (userData)=>{
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
}


export const logoutUser = ()=>{
    localStorage.removeItem(USER_KEY);
}

export const isUserAuthencticated = ()=>{
    return Boolean(localStorage.getItem(USER_KEY));
}