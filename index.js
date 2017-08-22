var fs = require('fs');
var crypto = require('crypto');
var axios = require('axios');
var admZip = require('adm-zip');

var auth = {};

function login(clientAPI, APIKey, baseURL){
    var url = clientAPI==='AJAPI'?baseURL+'login.json':baseURL+'login.json?auth_type=1';

    return axios.post(url, {identifier: APIKey.identifier})
        .then(function (response) {
            if(response.data.statusCode===200&&response.data.statusMessage==='OK'
                ||response.data.status===1&&response.data.statusMessage==='Success') {

                var authToken, reqToken;
                var errorGettingTokens = 'Error getting tokens. These values are null.';

                if(clientAPI==='ScoresAPI') {
                    authToken = response.data.authToken;
                    reqToken = response.data.reqToken;

                    if(authToken!=null&&reqToken!=null) {
                        auth[clientAPI] = {
                            authToken: response.data.authToken,
                            reqToken: response.data.reqToken
                        };
                    } else {
                        console.log(errorGettingTokens);
                    }
                } else {
                    authToken = response.data.data.authToken;
                    reqToken = response.data.data.reqToken;

                    if(authToken!=null&&reqToken!=null) {
                        auth[clientAPI] = Object.assign({},response.data.data);
                    }
                    else {
                        console.log(errorGettingTokens);
                    }
                }

                if(!!auth[clientAPI]) auth[clientAPI].reqToken = processReqToken(APIKey, auth[clientAPI]);
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
}

function processReqToken(keys, tokens) {
    var apiKeys = {
        encryptionKey: keys.encryptionKey,
        decryptionKey: keys.decryptionKey
    };

    var decrypted = decryptText("aes-128-cbc", apiKeys.decryptionKey, new Buffer(tokens.authToken,'base64'), tokens.reqToken, "base64");
    var reEncrypted = encryptText("aes-128-cbc", apiKeys.encryptionKey,  new Buffer(tokens.authToken,'base64'), decrypted, "base64");

    return reEncrypted;
}

function encryptText(cipher_alg, key, iv, text, encoding) {

    var cipher = crypto.createCipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    var result = cipher.update(text, "utf8", encoding);
    result += cipher.final(encoding);

    return result;
}

function decryptText(cipher_alg, key, iv, text, encoding) {
    var decipher = crypto.createDecipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    var result = decipher.update(text, encoding);
    result += decipher.final();

    return result;
}

function request(baseURL, tokens, data, endpoint) {
    var postData;
    if(endpoint) {
        postData = {authToken: tokens.authToken, reqToken: tokens.reqToken, [endpoint]: data};
    } else {
        postData = {authToken: tokens.authToken, reqToken: tokens.reqToken, data: data};
    }

    return axios.post(baseURL, postData)
        .then(function (response) {
           console.log(response.data)
        })
        .catch(function (error) {
            console.log('Error:',error);
        });
}

function getDataFromFiles(urlFolder) {
    var APIKey = {};

    var nameFileIdentifier = 'identifier.txt';
    var nameFileEncryption = 'encryption.key';
    var nameFileDecryption = 'decryption.key';
    if (fs.statSync(urlFolder).isDirectory()) {
        APIKey.identifier = readFile(urlFolder +'/'+nameFileIdentifier);
        APIKey.encryptionKey = readFile(urlFolder +'/'+nameFileEncryption);
        APIKey.decryptionKey = readFile(urlFolder +'/'+nameFileDecryption);
    } else {
        var zip = new admZip(urlFolder);
        APIKey.identifier = zip.readAsText(nameFileIdentifier);
        APIKey.encryptionKey = zip.readAsText(nameFileEncryption);
        APIKey.decryptionKey = zip.readAsText(nameFileDecryption);
    }

    return APIKey;
}

function readFile(URLfile) {
    var contentFile = fs.readFileSync(URLfile, 'utf8');
    return contentFile;
}

function init(data) {
    var URL_AJ = data.EWSAJ_prod==true?'https://api.eflglobal.com/api/v2/applicant_journey/':'https://uat-external.eflglobal.com/api/v2/applicant_journey/';
    var URL_Scores = data.EWSScores_prod==true?'https://api.eflglobal.com/api/v1/scores/':'https://uat-external.eflglobal.com/api/v1/scores/';
    var urlFolder = data.urlFolder;
    var APIKey = getDataFromFiles(urlFolder);

    return {URL_AJ: URL_AJ, URL_Scores: URL_Scores, APIKey: APIKey};
}

function startSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'startSession.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'startSession.json', auth.AJAPI, data);
    }
}

function finishSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishSession.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'finishSession.json', auth.AJAPI, data);
    }
}

function finishStep(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishStep.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'finishStep.json', auth.AJAPI, data);
    }
}

function createAttachment(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'createAttachment.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'createAttachment.json', auth.AJAPI, data);
    }
}

function getApplication(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'getApplication.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'getApplication.json', auth.AJAPI, data);
    }
}

function prefetchApplications(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'prefetchApplications.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'prefetchApplications.json', auth.AJAPI, data);
    }
}

function resumeSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'resumeSession.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'resumeSession.json', auth.AJAPI, data);
    }
}

function subject(data, APIKey, baseURL) {
    var endpoint = 'subjects';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint);
        });
    } else {
        return request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint);
    }
}

function dataQuery(data, APIKey, baseURL) {
    var endpoint = 'dateQuery';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint);
        });
    } else {
        return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint);
    }
}

module.exports = {
    init: init,
    startSession: startSession,
    finishSession: finishSession,
    finishStep: finishStep,
    createAttachment: createAttachment,
    getApplication: getApplication,
    prefetchApplications: prefetchApplications,
    resumeSession: resumeSession,
    subject: subject,
    dataQuery: dataQuery
};
