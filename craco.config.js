const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');
const path = require('path');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    modules: {
      localIdentName: '',
    },
    css: {
      /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
      loaderOptions: (cssLoaderOptions, { env, paths }) => cssLoaderOptions,
    },
    sass: {
      /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
      loaderOptions: (sassLoaderOptions, { env, paths }) => sassLoaderOptions,
    },
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: [],
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        },
      },
      /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
      loaderOptions: (postcssLoaderOptions, { env, paths }) =>
        postcssLoaderOptions,
    },
  },
  eslint: {
    enable: true /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
    /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
    configure: (eslintConfig, { env, paths }) => eslintConfig,
    /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
    pluginOptions: (eslintOptions, { env, paths }) => eslintOptions,
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => babelLoaderOptions,
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */,
  },
  webpack: {
    alias: {
    },
    plugins: {
      add: [] /* An array of plugins */,
      remove:
        [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
    },
    configure: (webpackConfig, { env, paths }) => webpackConfig,
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => jestConfig,
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) =>
    devServerConfig,
  plugins: [
    {
      plugin: reactHotReloadPlugin,
    },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.extend.json"
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: {
        overrideCracoConfig: ({
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => cracoConfig,
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => webpackConfig,
        overrideDevServerConfig: ({
          devServerConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, proxy, allowedHost },
        }) => devServerConfig,
        overrideJestConfig: ({
          jestConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, resolve, rootDir },
        }) => jestConfig,
      },
      options: {},
    },
  ],
};
