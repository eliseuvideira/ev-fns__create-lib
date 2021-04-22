const PrettyError = require("pretty-error");

exports.withPrettyError = fn => {
  try {
    fn();
  } catch (err) {
    console.log(
      new PrettyError()
        .appendStyle({
          "pretty-error": {
            marginLeft: 0,
          },
        })
        .skip(() => true)
        .render(err)
    );
  }
};
