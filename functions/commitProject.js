const { execSync } = require("child_process");

exports.commitProject = () => {
  execSync("git add -A", { stdio: "inherit" });
  execSync("git commit -m ':tada: first commit'", { stdio: "inherit" });
  execSync("yarn version --minor", { stdio: "inherit" });
  execSync("git push -u origin master");
  execSync("git push --tags");
};
