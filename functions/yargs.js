const yargs = require("yargs");

exports.yargs = () =>
  yargs
    .usage(
      "@ev-fns/create-lib -d <directory> -n <project-name> -r <repo> [options]"
    )
    .option("directory", {
      alias: "d",
      type: "string",
      default: ".",
      describe: "project directory",
      demandOption: true,
      requiresArg: true,
    })
    .option("name", {
      alias: "n",
      type: "string",
      describe: "project name",
      demandOption: true,
      requiresArg: true,
    })
    .option("repo", {
      alias: "r",
      type: "string",
      describe: "github repository",
      demandOption: true,
      requiresArg: true,
    })
    .option("keywords", {
      describe: "keywords",
      array: true,
    })
    .help()
    .version()
    .strict().argv;
