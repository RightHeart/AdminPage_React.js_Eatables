
import config from '../helpers/config';

var Product = module.exports = {
    getCategories: function () {

        let product_url = config.urls.api_url+config.urls.get_category_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    getProducts: function () {

        let product_url = config.urls.api_url+config.urls.get_product_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addProduct: function (data) {

        let product_url = config.urls.api_url+config.urls.add_product_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    editProduct: function (data) {

        let product_url = config.urls.api_url+config.urls.edit_product_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    deleteProduct: function (data) {

        let product_url = config.urls.api_url+config.urls.delete_product_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    postProductImage: function (data) {

        let product_url = config.urls.api_url+config.urls.post_product_image_path;

        var request = new Request(product_url, {
            method: 'POST',
            body:data
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    addProductPrice: function (data) {

        let product_url = config.urls.api_url+config.urls.add_product_price_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    getProductPrices: function () {

        let product_url = config.urls.api_url+config.urls.get_product_price_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    deleteProductPrice: function (data) {

        let product_url = config.urls.api_url+config.urls.delete_product_price_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    getProductPriceById: function (data) {

        let product_url = config.urls.api_url+config.urls.get_product_price_byid_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    getProductById: function (data) {

        let product_url = config.urls.api_url+config.urls.get_product_byid_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    editProductPrice: function (data) {

        let product_url = config.urls.api_url+config.urls.edit_product_price_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    addProductLocalize: function (data) {

        let product_url = config.urls.api_url+config.urls.add_product_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    getProductLocalizeById: function (data) {

        let product_url = config.urls.api_url+config.urls.get_product_localize_path + "/" + data.id;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(function (res) {
            return res;
        }).catch(function (err){
            return err;
        })
    },
    editProductLocalize: function (data) {

        let product_url = config.urls.api_url+config.urls.edit_product_localize_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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
    getProductCount: function () {

        let product_url = config.urls.api_url+config.urls.get_product_count_path;

        var headers = new Headers();
        headers.append("content-type","application/json");

        var request = new Request(product_url, {
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

export default Product;