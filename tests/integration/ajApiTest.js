var module = require('../../index.js'),
    ajModule = new module.ajApiClient,
    optimist = require('optimist'),
    chai  = require('chai'),
    expect = chai.expect;


describe('Applicant Journey CLient', function() {
    this.timeout(5000);
    let argvHostname = optimist.demand('hostname').argv,
        argvPathToApiKey = optimist.demand('pathToApiKey').argv;

    before(() => {
        ajModule.init({
            hostname: argvHostname.hostname,
            pathFolder: argvPathToApiKey.pathToApiKey
        });
    });

    describe('Call login', () => {
        it('Should come success response with status code 200, status message OK', done => {
            ajModule.login().then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call startSession', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCallStartSession = {
                applicant: {},
                application: "sdkExample"
            };
            ajModule.startSession(dataForCallStartSession).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call finishSession', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                sequence: 0
            };

            ajModule.finishSession(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call finishStep', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                applicant: {},
                device: {
                    browser: null,
                    deviceId: null,
                    ipAddress: null,
                    os: {
                        type: null,
                        version: null
                    },
                    referrer: null,
                    viewport: {
                        height: null,
                        width: null
                    }
                },
                metas: {},
                observations: {},
                sequence: 0,
                state: {},
                step: 'abGlobal'
            };

            ajModule.finishStep(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call createAttachment', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                attachmentType: 'photo',
                attachmentTypeVersion: '1.0',
                contentType: 'image/jpeg',
                inlineData: `/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgH
                            CAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg4BAgMDAwMDBwQEBw4JCAkODg4ODg4ODg4O
                            Dg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODv/CABEIAMgAyAMBIgACEQED
                            EQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAACAkBB//aAAgBAQAAAADfwAAABCc+AAAHqejjEqBAAACw
                            t7mJUCAAAFhb3MSoEAAALC3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFh
                            b3MSoEAAALC3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFhb3MSoEAAALC
                            3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFhb3MSoEAAALC3uZgycAAHeF
                            G6xAAAAP/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAcFBgME/9oACAECEAAAAPjxQB69DyMdAGre+Rjo
                            A1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3zErAGlaQAH//
                            xAAaAQEBAQEAAwAAAAAAAAAAAAAABwUEAQIG/9oACAEDEAAAAOfOAHvrYE+APPdUcCfADvqOBPgB
                            31HAnwA76jgT4Ad9RwJ8AO+o4E+AHfUcCfADvqOBPgB31HAnwA76ji/EADsooAD/xAA1EAAAAQYO
                            AgIBAwUAAAAAAAAEAAEDBQhWAgYJEBgZODlAdXaUlrPR0wcRIRITkRUxMlFh/9oACAEBAAE/AMU0
                            g1os/hD56RRRDqZANQQ1OHHGTQ0J4cL7SJEsE5v8zf2/bN/JVjK4dwNtD+wqxlcu4H2h/aVYyuXc
                            DbQ/sKsZXLuBtof2FWMrl3A+0P7SrGVy7gfaH9pVjK5dwNtD+wqxlcu4G2h/YVYyuXcD7Q/tKsZX
                            LuBtof2FWMrl3A20P7CrGVy7gbaH9hVjK5dwNtD+wqxlcu4G2h/YVYyuXcDbQ/sKsZXLuBtof2lW
                            Mrl3Q2zP7SrGVy7obZn9pVjK4dwPtD+0qxlcu4H2h/aVYyuXcDbQ/sL4GbKjV8xtmRbiD/RleBUA
                            pWDRIxKcNCgpzw0SM0KAaAf9w5jG/wB/Zj/f/J5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nD
                            MHXl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Z
                            g68vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDM
                            HXl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Zg
                            68vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDMH
                            Xl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Zg6
                            8vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDMHX
                            l8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNO2IzP8yfL7UwOM0QlIrViooEXwwRIlFrdGGhmTQEqa
                            FCN+mF+fr6SQfyVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8lQ+CoHtMOspeSIfBUD2mHWUvJUPgq
                            B7TDrKXkqHwVA9ph1lLyRD4Kge0w6yl5Kh8FQPaYdZS8lQ+CoHtMOspeSofBUD2mHWUvJUPgqB7T
                            DrKXkqHwVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8kQ+CoHtMOspeSofBUD2mHWUvJEPgqBzS7rK
                            XkiHwVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8lQ+CZSZS+bPittdRx1jqolYAi+FVg1AlShl0iE
                            QzQ0qI0GAb9EH8n/AD/GL//EACsRAAACBgoCAwEAAAAAAAAAAAEFAAIDEBU1BjBSU3FykaGxwQQR
                            EiFRE//aAAgBAgEBPwDyfKY+Gy/o1H0CR8st7JHyy3skfLLeyR8st7JHyy3skfLLeyR8st7JHyy3
                            skfLLeyR8st7IzOy9q0VZqLexWEAD6/XUklo4h3VlkxY5g5dSSWjiHdWWTFjmDl1JJaOId1ZZMWO
                            YOXUklo4h3VlkxY5g5dSSWjiHdWWTFjmDl1JJaOId1ZZMWOYOXUklo4h3VlkxY5g5dSSWjiHdWWT
                            FjmDl1JJaOId1ZZMWOYOXUklo4h3VlkxY5g5cfMWrfwPgyVFYfYfQfaQwxuVtBSGGNytoKQwxuVt
                            BSGGNytoKQwxuVtBSGGNytoKQwxuVtBSGGNytoKQwxuVtBSGGNytoKF5f5zPzmSyzJYABYPY+h/a
                            /wD/xAApEQABAQQLAAMBAQAAAAAAAAABBAADBTQCEBQVMFJTcYGRsRESITFB/9oACAEDAQE/AHz9
                            2nofd4fgNeiLM16IszXoizNeiLM16IszXoizNeiLM16IszXoizNeiPM1CJJHlMUKJ/T+VRiT5GGi
                            m3e49qjEnyMNFNu9x7VGJPkYaKbd7j2qMSfIw0U273HtUYk+Rhopt3uPaoxJ8jDRTbvce1RiT5GG
                            im3e49qjEnyMNFNu9x7VGJPkYaKbd7j2qMSfIw0U273HtUUdvHqX60B8n5H8axK9M9FrEr0z01iV
                            6Z6LWJXpnprEr0z0WsSvTPTWJXpnotYlememsSvTPTWJXpnoskSKqCmhSpUCACP8x//Z`,
                name: 'test',
                sha1Hash: 'a658db8045c171c85e42a257654bad0ebfec1ce1',
                size: 2217
            };
           ajModule.createAttachment(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call getApplication', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                device: {
                    browser: null,
                    deviceId: null,
                    ipAddress: null,
                    os: {
                         type: null,
                         version: null
                    },
                    referrer: null,
                    viewport: {
                        height: null,
                        width: null
                    }
                },
                player: {
                    type: 'web-embedded',
                    version: '1.20'
                }
            };

            ajModule.getApplication(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });

    describe('Call aggregate', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                requests: {
                    generalInfo: {
                        target: "finishStep",
                        data: {
                            uid: ajModule.getUid(),
                            step: "generalInfo",
                            sequence: 0,
                            applicant: {},
                            device: {
                                browser: null,
                                deviceId: null,
                                ipAddress: null,
                                os: {
                                    type: null,
                                    version: null
                                },
                                referrer: null,
                                viewport: {
                                    height: null,
                                    width: null
                                }
                            },
                            metas: {},
                            observations: {},
                            state: {},
                        }
                    },
                    journeyEnd: {
                        target: "finishStep",
                        data: {
                            uid: ajModule.getUid(),
                            step: "journeyEnd",
                            sequence: 0,
                            applicant: {},
                            device: {
                                browser: null,
                                deviceId: null,
                                ipAddress: null,
                                os: {
                                    type: null,
                                    version: null
                                },
                                referrer: null,
                                viewport: {
                                    height: null,
                                    width: null
                                }
                            },
                            metas: {},
                            observations: {},
                            state: {},
                        }
                    },
                    createAttachmentImage: {
                        target: "createAttachment",
                        data: {
                            uid: ajModule.getUid(),
                            attachmentType: "photo",
                            attachmentTypeVersion: "1.0",
                            contentType: 'image/jpeg',
                            inlineData: `/9j/4AAQSkZJRgABAQECqQKpAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgH
                                     CAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4O
                                     Dg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wAARCADIAMgDASIA
                                     AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEB
                                     AQEAAAAAAAAAAAAAAAAAAAgJ/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnYC+
                                     GX4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                     AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                     AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                     AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                     AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==`,
                            name: 'test_image',
                            sha1Hash: '878933c389d8a3c45e4bd38cd4fd0f61dc884a21',
                            size: 541
                        }
                    }
                }
            };

            ajModule.aggregate(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });

        });
    });

    describe('Call resumeSession', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                applicant: {}
            };

            ajModule.resumeSession(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });

        });
    });

    describe('Call prefetchApplications', () => {
        it('Should come success response with status code 200, status message OK', done => {
            let dataForCall = {
                applications: {
                    sdkExample: "64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0"
                }
            };

            ajModule.setUid('');

            ajModule.prefetchApplications(dataForCall).then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');

                done();
            });
        });
    });
});
