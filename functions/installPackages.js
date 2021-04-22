const { execSync } = require("child_process");
const { withChDir } = require("./withChDir");

exports.installPackages = dir =>
  withChDir(dir, () => {
    execSync("yarn add -D typescript jest @types/jest ts-jest", {
      stdio: "inherit",
    });
  });
