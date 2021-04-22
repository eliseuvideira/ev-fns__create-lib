const path = require("path");
const { writeFileSync } = require("fs");

const template = {
  name: "",
  version: "0.0.0",
  main: "lib/index.js",
  types: "lib/index.d.ts",
  author: "",
  license: "MIT",
  engines: {
    node: ">=14",
  },
  files: ["lib/**/*"],
  repository: {
    type: "git",
    url: "",
  },
  devDependencies: {},
  dependencies: {},
  scripts: {
    build: "tsc",
    coverage: "jest --coverage",
    prepublishOnly: "yarn build",
    test: "jest",
    watch: "jest --watch",
  },
};

exports.createPackageJson = (dir, { name, author, repo, keywords }) => {
  const config = { ...template };

  config.name = name;
  config.author = author;
  if (!repo) {
    delete config.repository;
  } else {
    config.repository.url = repo;
  }
  if (keywords) {
    config.keywords = keywords;
  }

  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(config, null, 2)
  );
};
