#!/usr/bin/env node

const path = require("path");
const { checkDestination } = require("./functions/checkDestination");
const { yargs } = require("./functions/yargs");
const { withPrettyError } = require("./functions/withPrettyError");
const { initProject } = require("./functions/initProject");
const { copyTemplate } = require("./functions/copyTemplate");
const { createPackageJson } = require("./functions/createPackageJson");
const { installPackages } = require("./functions/installPackages");
const { commitProject } = require("./functions/commitProject");
const rimraf = require("rimraf");

const { directory, name, repo, keywords } = yargs();

withPrettyError(() => {
  const TEMPLATE = path.resolve(path.join(__dirname, "template"));
  const DESTINATION = path.resolve(path.join(process.cwd(), directory));

  checkDestination(DESTINATION);

  try {
    initProject(DESTINATION, repo);

    const { author } = require(path.join(DESTINATION, "package.json"));

    copyTemplate(TEMPLATE, DESTINATION);

    createPackageJson(DESTINATION, { name, repo, keywords, author });

    installPackages(DESTINATION);

    commitProject(DESTINATION);
  } catch (err) {
    rimraf.sync(DESTINATION);
    throw err;
  }
});
