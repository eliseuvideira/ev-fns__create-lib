const { writeFileSync, readFileSync } = require("fs");
const path = require("path");
const fse = require("fs-extra");

const gitIgnore = `
coverage/
lib/
node_modules/
*.log
*.error
`.trim();

exports.copyTemplate = (template, destination, { name, description }) => {
  fse.copySync(template, destination);
  writeFileSync(path.join(destination, ".gitignore"), gitIgnore + "\n");

  const readme = readFileSync(path.join(destination, "README.md"));
  writeFileSync(
    path.join(destination, "README.md"),
    readme
      .replace(/\{\{project-name\}\}/g, name)
      .replace(
        /\{\{project-description\}\}/g,
        description || "Project description"
      )
  );
};
