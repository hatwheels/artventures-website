// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Artventures',

  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-158832476-1',
      }
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Home',
        path: 'content/home/*.md',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/cms-admin`,
        configPath: `static/cms-admin/config.yml`,
        htmlTitle: `Artventures CMS`,
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
}
