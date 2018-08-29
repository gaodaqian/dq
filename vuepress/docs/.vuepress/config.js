module.exports = {
  base: '/vue-press/',
  title: 'daqian ',
  description: 'some notes',
  search: false,
  searchMaxSuggestions: 10,
  editLinkText: 'Edit this page on GitHub',
  lastUpdated: true, // string | boolean
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '笔记', link: '/home/' }
    ],
    sidebar: {
      '/home/': [
        '',
        '01_vueSourceCode',
        '02_vuejs',
        '03_wangDoc',
        'vuePressNodes'
      ],
      '/': [
        '',
        'contact',
        'about'
      ]
    }
  }
}
