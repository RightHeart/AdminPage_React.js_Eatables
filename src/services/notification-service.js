
import config from '../helpers/config';

var Notification = module.exports = {
    getProductSubscribe: function () {

        let noti_url = config.urls.api_url+config.urls.get_product_subscribe_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(noti_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    }
}

export default Notification;