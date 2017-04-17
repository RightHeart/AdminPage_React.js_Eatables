
import config from '../helpers/config';

var MobileUser = module.exports = {
    getMobileUsers: function () {

        let mobile_user_url = config.urls.api_url+config.urls.get_mobile_user_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(mobile_user_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    deleteMobileUser: function (data) {

        let mobile_user_url = config.urls.api_url+config.urls.delete_mobile_user_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(mobile_user_url, {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(data)
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    }
}

export default MobileUser;