const { execSync } = require("child_process");
const { withChDir } = require("./withChDir");

exports.isGitRepo = dir => {
  try {
    withChDir(dir, () => {
      execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    });
    return true;
  } catch (err) {
    return false;
  }
};
