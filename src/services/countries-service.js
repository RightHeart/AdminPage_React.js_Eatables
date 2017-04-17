
import config from '../helpers/config';

var Country = module.exports = {
    getDefaultCountries: function () {

        let country_url = config.urls.api_url+config.urls.get_default_countries_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    getCountries: function () {

        let country_url = config.urls.api_url+config.urls.get_country_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addCountry: function (data) {

        let country_url = config.urls.api_url+config.urls.add_country_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
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
    editCountry: function (data) {

        let country_url = config.urls.api_url+config.urls.edit_country_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    deleteCountry: function (data) {

        let country_url = config.urls.api_url+config.urls.delete_country_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
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
    getCountryById: function (data) {

        let country_url = config.urls.api_url+config.urls.get_country_byid_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(country_url, {
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

export default Country;