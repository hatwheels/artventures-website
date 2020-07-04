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
        disabled: true,
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
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Pages',
        path: 'content/pages/*.md',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
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
