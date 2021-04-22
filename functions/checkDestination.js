const { existsSync, statSync, mkdirSync, readdirSync } = require("fs");

const createDirectoryIfNotExists = dir => {
  if (!existsSync(destination)) {
    mkdirSync(destination);
  }
};

const isEmpty = dir => readdirSync(dir).length === 0;

const isDirectory = path => {
  const stats = statSync(path);
  return stats.isDirectory();
};

exports.checkDestination = destination => {
  createDirectoryIfNotExists(destination);

  if (!isDirectory(destination)) {
    throw new Error(`invalid destination ${destination}, not a directory`);
  }

  if (!isEmpty(destination)) {
    throw new Error(
      `invalid destination ${destination}, directory is not empty`
    );
  }
};
