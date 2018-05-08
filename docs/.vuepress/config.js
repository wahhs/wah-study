module.exports = {
    title: 'Wah',
    description: 'Just playing',
    host: 'localhost',
    port: '2323',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        
        // head: [
        //     ['link', { rel: 'icon', href: `/logo.png` }]
        //   ],

        // 顶部导航栏
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Devlops', 
                items: [
                    {text: 'vuepress', link: '/markvue/'}
                ] 
            },
            { text: 'Network',
                items: [
                    {text: 'Network', link:'/network/'}
                ]    
            },
            { text: 'External', link: 'https://google.com' },
        ],
        
        // 侧栏分级
        sidebar: {
            '/markvue/': [
                '',     /* /foo/ */
                'install',  /* /foo/one.html */
                'theme'   /* /foo/two.html */
            ],
            '/network/':[
                '',
                'osi',
                'tuopu'
            ],

            // '/bar/': [
            //     '',      /* /bar/ */
            //     'three', /* /bar/three.html */
            //     'four'   /* /bar/four.html */
            // ],

            // fallback
            '/': [
                '',        /* / */
                'contact', /* /contact.html */
                'about'    /* /about.html */
            ]
        }
    


    
    }



};