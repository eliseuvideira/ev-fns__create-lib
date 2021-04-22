const fse = require("fs-extra");

exports.copyTemplate = (template, destination) =>
  fse.copySync(template, destination);
