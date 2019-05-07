const path = require('path');

module.exports = async ({ config, mode }) => {
  //   `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   You can change the configuration based on that.
  //   'PRODUCTION' is used when building the static version of storybook.
  //
  //   Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    atoms: path.resolve(__dirname, '../src/atoms/'),
    pages: path.resolve(__dirname, '../src/pages/'),
    utils: path.resolve(__dirname, '../src/utils/')
  }

  return config;
};
