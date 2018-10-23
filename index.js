var axios = require('axios').default;

var appConfig;

function getOptions() {
    return { headers: { 'Authorization': 'Key ' + appConfig.key } };
}
function getUrl(entityName) {
    return `${appConfig.rootUrl}/rest/${entityName}`;
}

/**
 * Add new object
 * @param {Object} obj 
 * @param {String} entityName 
 */
function add(entityName, obj) {
    return axios.post(getUrl(entityName), obj, getOptions()).then(r => r.data.id);
}

/**
 * Update the object
 * @param {String} entityName 
 * @param {Object} obj 
 */
function update(entityName, obj) {
    return axios.put(getUrl(entityName)+'/'+obj.id, obj, getOptions()).then(r => r.data);
}

/**
 * Delete object
 * @param {String} entityName
 * @param {String} id  
 */
function del(entityName, id) {
    return axios.delete(getUrl(entityName) + '/' + id, getOptions()).then(r => r.data);
}

/**
 * Get array of filtered objects
 * @param {String} entityName 
 * @param {Object} query 
 */
function get(entityName, query) {
    return axios.get(getUrl(entityName) + '?' + (filters ? Object.keys(query).map(k => k + '=' + query[k]).join('&') : ''), getOptions()).then(r => r.data);
}

/**
 * Get object by id
 * @param {String} entityName 
 * @param {String} id 
 */
function getOne(entityName, id) {
    return axios.get(getUrl(entityName) + '/' + id, getOptions()).then(r => r.data);
}

module.exports = function (config) {
    appConfig = config;

    if (!appConfig.rootUrl) appConfig.rootUrl = 'http://easyeasy.io/v1';
    if (!appConfig.key) throw new Error('API_KEY not specified');

    return {
        add: add,
        update: update,
        del: del,
        get: get,
        getOne: getOne
    }
}

