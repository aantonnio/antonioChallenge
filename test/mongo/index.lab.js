require('dotenv').config();
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const lab = module.exports.lab = Lab.script();
const expect = Code.expect;

const {dbConnect, dbDisconnect} = require('../../app/persistence/persistence');
const Model = require('../../app/persistence/model');
const fixtures = require('../fixtures');
const structureResolver = require('../resolvers/structuresResolver');
const statusResolver = structureResolver.responseStatus;
const csvSubjects = fixtures.csvSubjects;

const constants = {
  deniedFailedMessage: 'subject should have thrown exception',
  acceptedFailedMessage: 'subject should have returned 200-ok'
};

lab.experiment('behavior tests' , { timeout: 0 }, () => {

  lab.before(async () => {
    dbConnect();
  });
  lab.after(async () => dbDisconnect());

  lab.experiment('success', () => {

    lab.test('success', async () => {

      const data = {
        UUID: 3464565,
        make: 'Acura'
      };
      let savedData;
      try {
        savedData = await Model.create(data);
      } catch (error) {
        console.log(error);
        Code.fail('fails');
      }
      console.log(savedData);

      let query;
      try {
        query = await Model.findById(savedData._id);
      } catch (error) {
        console.log(error);
        Code.fail('fails');
      }
      console.log(query);
    });

  });

});