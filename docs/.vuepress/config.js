module.exports = {
    title: 'Wah',
    description: 'Just playing',
    host: 'localhost',
    port: '2323',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: 'Home', link: '/' },
            { 
                text: 'Devlops', 
                items: [
                    {text: 'vuepress', link: '/markvue/'}
                ] 
            
            },
            { text: 'External', link: 'https://google.com' },
        ],
        sidebar: {
            '/markvue/': [
                '',     /* /foo/ */
                'install',  /* /foo/one.html */
                //'two'   /* /foo/two.html */
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