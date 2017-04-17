
import config from '../helpers/config';

var SlideImage = module.exports = {
    getSlideImages: function () {

        let slide_url = config.urls.api_url+config.urls.get_slide_image_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(slide_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addSlideImage: function (data) {

        let slide_url = config.urls.api_url+config.urls.add_slide_image_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(slide_url, {
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
    deleteSlideImage: function (data) {

        let slide_url = config.urls.api_url+config.urls.delete_slide_image_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(slide_url, {
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
    postSlideImage: function (data) {

        let slide_url = config.urls.api_url+config.urls.post_slide_image_path;

        var request = new Request(slide_url, {
            method: 'POST',
            body:data
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    changeSlideSequence: function (data) {

        let slide_url = config.urls.api_url+config.urls.change_slide_seq_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(slide_url, {
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
}

export default SlideImage;