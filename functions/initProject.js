const { execSync } = require("child_process");
const { withChDir } = require("./withChDir");

exports.initProject = (dir, repo) =>
  withChDir(dir, () => {
    execSync("git init", { stdio: "inherit" });
    execSync(`git remote add origin ${repo}`);
    execSync("yarn init -y", { stdio: "inherit" });
  });
