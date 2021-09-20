require('dotenv').config();
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const lab = module.exports.lab = Lab.script();
const expect = Code.expect;

const FormData = require('form-data');
const fs = require('fs');

const subject = require('./subject');
const fixtures = require('../fixtures');
const structureResolver = require('../resolvers/structuresResolver');
const statusResolver = structureResolver.responseStatus;
const csvSubjects = fixtures.csvSubjects;

const constants = {
  deniedFailedMessage: 'subject should have thrown exception',
  acceptedFailedMessage: 'subject should have returned 200-ok'
};

lab.experiment('behavior tests' , { timeout: 0 }, () => {

  lab.experiment('success', () => {

    lab.test('baseline success', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.baseline)
        .then(response => {
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);
          expect(response.data.data[0]).to.be.an.object();
          console.log(response.data.data[0]);
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });

    lab.test('success with one column', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.oneColumn)
        .then(response => {
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);
          expect(response.data.data[0].UUID).to.be.a.number();
          
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });

    lab.test('success with columns in different order', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.differentOrder)
        .then(response => {
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);
          expect(response.data.data[0].UUID).to.be.a.number();
          
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });

    lab.test('success with excess columns', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.excessColumns)
        .then(response => {
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);          
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });


    lab.test('success with headers in upper-case', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.upperCase)
        .then(response => {
          console.log(response.data.data[0]);
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);          
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });

    lab.test('success with headers in snake-case', async () => {

      return subject.uploadCSVSubjectWithProviderName(csvSubjects.snakeCase)
        .then(response => {
          console.log(response.data.data[0]);
          expect(response.status).equals(statusResolver.ok);
          expect(response.data.status).equals(statusResolver.ok);          
        })
        .catch(error => {
          console.log(error);
          Code.fail(constants.acceptedFailedMessage);
        });
    });
  });

  lab.experiment('validations', () => {

    lab.test('denied with empty form-data request', async () => {
      let formDataRequest = new FormData();
      let response;
      try {
        response = await subject.callAPI(formDataRequest, process.env.API_PATH);
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.noFileUploadErrorMessage);
      }
    });

    lab.test('denied with empty csv', async () => {
      try {
        const response = await subject.uploadCSVSubjectWithProviderName(csvSubjects.empty);
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.fileIsEmptyErrorMessage);
      }
    });

    lab.test('denied without providerName', async () => {
      let formDataRequest = new FormData();
      formDataRequest.append(fixtures.propertyNames.file, fs.createReadStream(subject.getFilePathFromCsvSubject(csvSubjects.baseline)));
      let response;
      try {
        response = await subject.callAPI(formDataRequest, process.env.API_PATH);
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.noCorrectMetadataErrorMessage);
      }
    });

    lab.test('denied with empty providerName', async () => {
      let emptyProviderName = '';
      let formDataRequest = new FormData();
      formDataRequest.append(fixtures.propertyNames.providerName, emptyProviderName);
      let response;
      try {
        response = await subject.callAPI(formDataRequest, process.env.API_PATH);
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.noFileUploadErrorMessage);
      }
    });

    lab.test('denied without file', async () => {
      let formDataRequest = new FormData();
      formDataRequest.append(fixtures.propertyNames.providerName, 'someProviderName');
      let response;
      try {
        response = await subject.callAPI(formDataRequest, process.env.API_PATH);
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.noFileUploadErrorMessage);
      }
    });

    lab.test('denied only excess columns', async () => {

      try {
        response = await subject.uploadCSVSubjectWithProviderName(csvSubjects.onlyExcess)
        Code.fail(constants.deniedFailedMessage);
        console.log(response);
      } catch (error) {
        expect(error.response.status).to.equal(statusResolver.badRequest);
        expect(error.response.data).to.equal(structureResolver.fileIsEmptyErrorMessage);
      }
    });

  });

});