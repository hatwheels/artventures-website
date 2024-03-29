// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
// const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = function (api) {
  // api.chainWebpack((config, { isServer }) => {
  //   if (isServer) {
  //     config.externals([
  //       nodeExternals({
  //         allowlist: [/^vuetify/]
  //       })
  //     ])
  //   }
  // })

  // eslint-disable-next-line no-unused-vars
  api.chainWebpack((config, { isServer }) => {
    if( process.env.GRIDSOME_NODE_ENV === 'development')
    {
      config.devtool = 'source-map'
    }
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin);
  });
  // eslint-disable-next-line no-unused-vars
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })
  // eslint-disable-next-line no-unused-vars
  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
