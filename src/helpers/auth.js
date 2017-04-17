import config from './config';

module.exports = {
    login(username,password,check){
        let auth_url = config.urls.api_url+config.urls.auth_path;
        fetch(auth_url, {
            method: 'POST',
            body: JSON.stringify({username:username,password:password}),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then((data)=>{
            data.json().then((data)=>{
                if(data.status){
                    localStorage.token = data.token;
                    localStorage.expiry_token = data.expiry_token;
                    localStorage.setItem("loginUser",JSON.stringify(data['data']));
                    check({"status":true,"message":"Logged In"});
                }else{
                    check({"status":false,"message":"Username/Password are wrong."});
                }
                return
            });
        });
    },
    loggedIn(){
        if(localStorage.token && localStorage.expiry_token){
            let expiry_token = Number(localStorage.expiry_token);
            let current_time = new Date().getTime();
            if(current_time < expiry_token){
                return true;
            }
        }
        return false;
    },
    getToken(){
        return localStorage.token
    },
    logout(){
        delete localStorage.token;
        delete localStorage.expiry_token;
        localStorage.removeItem("loginUser");
    }
}