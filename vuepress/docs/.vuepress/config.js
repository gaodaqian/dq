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
        '02_wangDoc',
        '03_mpvue',
        '04_vuePressNodes',
        '05_vueCourse',
        '06_vueApi',
        '07_vueRouter',
        '08_vueRouterApi',
        '09_vuex',
        '10_vuexApi',
        '11_vueSSR',
        '12_vueSSRApi',
        '13_vueLoader',
        '14_vueMucic',
      ],
      '/': [
        '',
        'contact',
        'about'
      ]
    }
  }
}
