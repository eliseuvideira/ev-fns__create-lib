const { writeFileSync } = require("fs");
const path = require("path");
const fse = require("fs-extra");

const gitIgnore = `
coverage/
lib/
node_modules/
*.log
*.error
`.trim();

exports.copyTemplate = (template, destination) => {
  fse.copySync(template, destination);
  writeFileSync(path.join(destination, ".gitignore"), gitIgnore + "\n");
};
