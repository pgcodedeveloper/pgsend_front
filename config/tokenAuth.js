import clienteAxios from ".";

const tokenAuth = (token) =>{
    if(token){
        clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else{
        delete clienteAxios.defaults.headers.common["Authorization"];
    }
}

export default tokenAuth;