const {
  existsSync,
  statSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  rmdirSync,
} = require("fs");
const { isGitRepo } = require("./isGitRepo");

const createDirectoryIfNotExists = dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir);
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

  if (isGitRepo(destination)) {
    rmdirSync(destination);
    throw new Error(
      `invalid destination ${destination}, directory already has git initialized`
    );
  }
};
