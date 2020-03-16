require.config({
  baseUrl: '/',
  paths: {
    'jquery': 'libs/jquery/jquery-3.4.1.min',
    'swiper': 'libs/swiper/swiper.min',
    'header': 'js/header',
    'bootstrap': 'libs/bootstrap-3.3.7-dist/js/bootstrap.min',
    'carousel': '/js/modules/carousel',
    'template': '/libs/art-template/template-web',
    'url': '/js/url',
    'utils': 'libs/utils',
    'enlarge': '/libs/enlarge',
    'fly': '/libs/jquery-plugins/jqueryfly/jquery.fly.min',
    'cookie': '/libs/jquery-plugins/jquerycookie/jquery.cookie'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'fly': {
      deps: ['jquery']
    },
    'cookie': {
      deps: ['jquery']
    }
  }
})
