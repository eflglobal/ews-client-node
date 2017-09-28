var scoresModule = require('../../index.js').scoresapiclient,
    optimist = require('optimist'),
    chai  = require('chai'),
    expect = chai.expect;

describe('Scores CLient', function () {
    this.timeout(5000);
    let data,
        argvHostname = optimist.demand('hostname').argv,
        argvPathToApiKey = optimist.demand('pathToApiKey').argv,
        clientAPI = {
            name: 'ScoresAPI',
            path: 'api/v1/scores',
            pathParams: 'auth_type=1'
        };

    before(() => {
        data = scoresModule.init({
            hostname_Scores: argvHostname.hostname,
            pathFolder: argvPathToApiKey.pathToApiKey
        });
    });

    describe('Call login', () => {
        it('Should come success response with status 1, status message Success', done => {
            scoresModule.login(clientAPI, data.APIKey, data.hostname_Scores).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call subject', () => {
        it('Should come success response with status 1, status message Success', done => {
            let dataForCall = [
                {
                    "identification": [
                        {
                            "type": "nationalId",
                            "value": "DZ-015"
                        }
                    ]
                }
            ];

            scoresModule.subject(dataForCall, data.APIKey, data.hostname_Scores).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call dataQuery', () => {
        it('Should come success response with status 1, status message Success', done => {
            let dataForCall = "2017-08-24 00:00:00";

            scoresModule.dataQuery(dataForCall, data.APIKey, data.hostname_Scores).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });
});
