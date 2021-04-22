const yargs = require("yargs");

exports.yargs = () =>
  yargs
    .usage("$0 -d <directory> [options]")
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
    })
    .option("repo", {
      alias: "r",
      type: "string",
      describe: "github repository",
    })
    .option("keywords", {
      describe: "keywords",
      array: true,
    })
    .help()
    .version().argv;
