
import config from '../helpers/config';

var SiteUser = module.exports = {
    getSiteUsers: function () {

        let siteuser_url = config.urls.api_url+config.urls.get_siteuser_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(siteuser_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addSiteUser: function (data) {

        let siteuser_url = config.urls.api_url+config.urls.add_siteuser_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(siteuser_url, {
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
    editSiteUser: function (data) {

        let siteuser_url = config.urls.api_url+config.urls.edit_siteuser_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(siteuser_url, {
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
    deleteSiteUser: function (data) {

        let siteuser_url = config.urls.api_url+config.urls.delete_siteuser_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(siteuser_url, {
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

export default SiteUser;