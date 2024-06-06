const { webpack } = require("next/dist/build/webpack");

module.exports = (config) => {
  // 선택한 플러그인을 'externals' 또는 'module.rules' 섹션에 추가합니다:

  // webpack-node-externals:
  config.externals = [webpack.nodeExternals()];

  // buffer-loader:
  config.module.rules.push({
    test: /\.buffer$/,
    loader: "buffer-loader",
  });

  return config;
};
