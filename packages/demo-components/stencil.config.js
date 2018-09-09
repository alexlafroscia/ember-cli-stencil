exports.config = {
  namespace: "demo",
  outputTargets: [{ type: "dist" }]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
