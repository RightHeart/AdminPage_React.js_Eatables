
import config from '../helpers/config';

var Setting = module.exports = {
    getConfig: function () {

        let config_url = config.urls.api_url+config.urls.get_config_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(config_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addConfig: function (data) {

        let config_url = config.urls.api_url+config.urls.add_config_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(config_url, {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(data)
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    editConfig: function (data) {

        let config_url = config.urls.api_url+config.urls.edit_config_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(config_url, {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(data)
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    getConfigById: function (data) {

        let config_url = config.urls.api_url+config.urls.get_config_byid_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(config_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    deleteConfig: function (data) {

        let config_url = config.urls.api_url+config.urls.delete_config_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(config_url, {
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

export default Setting;