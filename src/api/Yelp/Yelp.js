import 'whatwg-fetch';
import fetchJSONP from 'fetch-jsonp';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import Categories from 'static/json/categories.json';
import { filter, isArray, find } from 'lodash';

const GET = 'GET';
const POST = 'POST';

export default class Yelp {
  
  constructor(consumer, consumerSecret, token, tokenSecret) {
    this.base = 'https://api.yelp.com/v2/';
    this.oauth = OAuth({
      consumer: {
        key: consumer,
        secret: consumerSecret
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (base_string, key) => {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
      }
    });
    this.token = {
      key: token,
      secret: tokenSecret
    };
  }
  
  /**
   * Find city, state and postal from lat long
   */
  whereAmI(lat, long){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`;
    return fetch(url)
    .then(function (d) {
      return d.json();
    })
    .then((response) => {
      let item = null;
      if(response.status === 'OK'){
        item = find(response.results, (r) => r.types.length === 1 && r.types[0] === 'postal_code');
        if(item){
          item = item.address_components;
          item = {
            city: find(item, (r) => r.types.indexOf('locality') != -1).short_name,
            state: find(item, (r) => r.types.indexOf('administrative_area_level_1') != -1).short_name,
            postal: find(item, (r) => r.types.indexOf('postal_code') != -1).short_name
          };
        }
      }
      return item;
    });
  }
  
  /**
   * Search for food or restaurants
   */
  search(request) {
    let { term, category, location, limit } = request;
    return this.fetchB(GET, 'search', {
      term: term,
      location: location,
      category_filter: category,
      limit: limit || 30
    });
  }
  
  /**
   * Get information about 1 or more businesses
   *
   */
  business = (business) => {
    business = isArray(business) ? business : [business];
    business = business.map(b => encodeURIComponent(b));
    
    return Promise.all(business.map(b => this.fetchB(GET, 'business/' + b)));
  }
  
  fetchB = (verb, url, data) => {
    data = data || {};
    url = this.base + url + (url.indexOf('?') === -1 ? '?' : '&');
    
    // attach the JSONP callback function prior authorize
    let cb = this.generateCallbackFunction();
    data.callback = cb;
    
    // setup GET or POST request
    let request = verb === GET ? 
    {
      url: url + this.objectToURI(data),
      method: verb
    } : {
      url: url,
      method: verb,
      data: data
    };
    
    // authorize request
    data = this.oauth.authorize(request, this.token);
    
    // retrieve JSON
    return fetchJSONP(url + this.objectToURI(data),
      { jsonpCallbackFunction: cb }
    ).then(function (d) {
      return d.json();
    });
  }
  
  objectToURI(object) {
    return Object.keys(object).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
    }).join('&');
  }
  
  generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }
  
}
