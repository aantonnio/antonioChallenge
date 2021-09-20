const structures = require('../utils/structures');

module.exports.log = (message) => {
  console.log(message);
};

module.exports.serverStarted = () => {
  this.log(structures.getServerStartedMessage());
};

module.exports.error = (error) => {
  console.error(error);
};