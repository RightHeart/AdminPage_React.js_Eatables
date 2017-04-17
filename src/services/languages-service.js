
import config from '../helpers/config';

var Language = module.exports = {
    getLanguages: function () {

        let lang_url = config.urls.api_url+config.urls.get_language_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(lang_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addLanguage: function (data) {

        let lang_url = config.urls.api_url+config.urls.add_language_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(lang_url, {
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
    editLanguage: function (data) {

        let lang_url = config.urls.api_url+config.urls.edit_language_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(lang_url, {
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
    deleteLanguage: function (data) {

        let lang_url = config.urls.api_url+config.urls.delete_language_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(lang_url, {
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
    getLanguageById: function (data) {

        let lang_url = config.urls.api_url+config.urls.get_language_byid_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(lang_url, {
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

export default Language;