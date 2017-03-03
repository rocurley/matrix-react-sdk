
'use strict';

module.exports = function(mxcUrl,client) {
    const url = client.mxcUrlToHttp(mxcUrl);
    return fetch(url)
        .then(response => response.json())
        .then(pack => {
            pack.packUrl = mxcUrl;
            return pack
        })
}
