exports.withChDir = (dir, fn) => {
  const cwd = process.cwd();
  try {
    process.chdir(dir);
    fn();
  } finally {
    process.chdir(cwd);
  }
};
