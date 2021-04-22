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

const { directory, name, repo, keywords, description } = yargs();

withPrettyError(() => {
  if (!/^[-@a-z0-9\/]+$/.test(name)) {
    throw new Error(`invalid project name "${name}"`);
  }
  if (
    !/^git@[\w\.]+:[\w\.@\:\/\-~]+\.git$|^https:\/\/[\w\.@\:\/\-~]+$/.test(repo)
  ) {
    throw new Error(`invalid repo "${name}"`);
  }
  const invalidKeywords = (keywords || []).map(
    keyword => !/^[-a-z0-9]+$/.test(keyword)
  );
  if (invalidKeywords.length > 0) {
    throw new Error(
      `invalid keywords ${invalidKeywords.map(x => `"${x}"`).join(", ")}`
    );
  }

  const TEMPLATE = path.resolve(path.join(__dirname, "template"));
  const DESTINATION = path.resolve(path.join(process.cwd(), directory));

  checkDestination(DESTINATION);

  try {
    initProject(DESTINATION, repo);

    const { author } = require(path.join(DESTINATION, "package.json"));

    copyTemplate(TEMPLATE, DESTINATION, { name, description });

    createPackageJson(DESTINATION, { name, repo, keywords, author });

    installPackages(DESTINATION);

    commitProject(DESTINATION);
  } catch (err) {
    rimraf.sync(DESTINATION);
    throw err;
  }
});
