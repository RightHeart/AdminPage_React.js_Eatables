
import config from '../helpers/config';

var Localize = module.exports = {
    getAppWords: function () {

        let localize_url = config.urls.api_url+config.urls.get_app_words_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    getAllAppLocalize: function () {

        let localize_url = config.urls.api_url+config.urls.get_app_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addAppWord: function (data) {

        let localize_url = config.urls.api_url+config.urls.add_app_word_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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
    addAppLocalize: function (data) {

        let localize_url = config.urls.api_url+config.urls.add_app_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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
    deleteAppWord: function (data) {

        let localize_url = config.urls.api_url+config.urls.delete_app_word_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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
    deleteAppLocalize: function (data) {

        let localize_url = config.urls.api_url+config.urls.delete_app_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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
    editAppWord: function (data) {

        let localize_url = config.urls.api_url+config.urls.edit_app_word_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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
    editAppLocalize: function (data) {

        let localize_url = config.urls.api_url+config.urls.edit_app_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(localize_url, {
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

export default Localize;