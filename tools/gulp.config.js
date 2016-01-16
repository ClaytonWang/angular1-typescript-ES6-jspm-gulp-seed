var systemConfig = require('./getSystemConfig');

var app = 'app';
var src = 'app/src';
var srcAssets = 'app/assets';
var vendor = 'app/vendor';
var styles = '/styles';
var fonts = '/styles/fonts';
var languages = '/languages';
var build = 'build';
var coverage = 'build/coverage';
var production = 'build/production';
var productionAssets = 'build/production/styles';
var gsapPath = app + systemConfig.getPath('greensock');

var gsap = {
  easing: {
    EasePack: gsapPath + 'easing/EasePack.js'
  },
  plugins: {
    AttrPlugin: gsapPath + 'plugins/AttrPlugin.js',
    BezierPlugin: gsapPath + 'plugins/BezierPlugin.js',
    ColorPropsPlugin: gsapPath + 'plugins/ColorPropsPlugin.js',
    CSSPlugin: gsapPath + 'plugins/CSSPlugin.js',
    CSSRulePlugin: gsapPath + 'plugins/CSSRulePlugin.js',
    DirectionalRotationPlugin: gsapPath + 'plugins/DirectionalRotationPlugin.js',
    EaselPlugin: gsapPath + 'plugins/EaselPlugin.js',
    EndArrayPlugin: gsapPath + 'plugins/EndArrayPlugin.js',
    KineticPlugin: gsapPath + 'plugins/KineticPlugin.js',
    RaphaelPlugin: gsapPath + 'plugins/RaphaelPlugin.js',
    RoundPropsPlugin: gsapPath + 'plugins/RoundPropsPlugin.js',
    ScrollToPlugin: gsapPath + 'plugins/ScrollToPlugin.js',
    TextPlugin: gsapPath + 'plugins/TextPlugin.js'
  },
  utils: {
    Draggable: gsapPath + 'utils/Draggable.js'
  },
  jquery: gsapPath + 'jquery.gsap.js',
  TimelineLite: gsapPath + 'TimelineLite.js',
  TimelineMax: gsapPath + 'TimelineMax.js',
  TweenLite: gsapPath + 'TweenLite.js',
  TweenMax: gsapPath + 'TweenMax.js'
};

module.exports = {
  expressServer: {
    development: {
      baseDir: app,
      baseURL: '/',
      port: 8000,
      liveReloadPort: 8100,
      mongoDB: '',
      useMongoDB: false
    },
    production: {
      baseDir: production,
      baseURL: '/',
      port: 9000,
      liveReloadPort: 9100,
      mongoDB: '',
      useMongoDB: false
    },
    coverage: {
      baseDir: coverage + '/remap/html-report',
      baseURL: '/',
      port: 7000,
      liveReloadPort: 7100,
      mongoDB: '',
      useMongoDB: false
    },
    sassdoc: {
      baseDir: '/docs/sassdoc',
      baseURL: '/',
      port: 8600,
      liveReloadPort: 8700,
      mongoDB: '',
      useMongoDB: false
    },
    typedoc: {
      baseDir: '/docs/typedoc',
      baseURL: '/',
      port: 6200,
      liveReloadPort: 6300,
      mongoDB: '',
      useMongoDB: false
    }
  },
  delete: {
    production: production,
    coverage: coverage,
    conceptsCompiled: 'app/concepts/**/!(*.e2e | *.jo)*.+(*map|*js)!',
    devCompiled: 'app/src/!(e2e)**/*.+(*map|*js)',
    css: 'app/assets/styles/**/*.css'
  },

  watch: {
    html: src + '/**/*.html',
    ts: src + '/**/*.ts',
    sass: app + '/**/*.scss',
    sassdoc: 'docs/sassdoc/**/*',
    typedoc: 'docs/typedoc/**/*',
    languages: src + '/**/*en-us.lang.json',
    coverage: coverage + '/remap/html-report/**/*.html'
    //,
    //all: [
    //  app + '/**/*',
    //  '!' + app + '/**/*.scss'
    //]
  },
  app: app,
  production: production,
  typescript: {
    development: {
      src: src,
      ts: app + '/src/**/!(*.po|*.e2e)*.ts',
      typedoc: app + '/src/!(app | app.templates)**/!(module|*.test|*.e2e|*.po)*.ts',
      coverage: build + '/coverage/'
    },
    production: {
      scripts: app + '/src/**/*.ts',
      dest: production + '/src'
    }
  },

  html: {
    development: {
      source: app + '/**/*.html',
      dest: app + '/src'
    },
    production: {
      source: app + '/index.html',
      dest: production
    }
  },

  gsap: {
    dest: src + '/animation.gsap/',
    fileName: 'gsap.factory.ts',
    template: src + '/animation.gsap/templates/gsap.factory.template.ts',
    inject: [
      gsap.TweenMax,
      gsap.TimelineMax,
      gsap.plugins.CSSPlugin,
      gsap.plugins.CSSRulePlugin
    ]
  },

  translate: {
    development: {
      source: src + '/**/*en-us.lang.json',
      dest: app + languages
    },
    production: {
      source: app + languages + '/**/*.json',
      dest: production + languages
    }
  },

  sass: {
    development: {
      fonts: [
        srcAssets + styles + '/fonts/**/*.scss',
        srcAssets + styles + '/fonts.scss'],
      app: [
        srcAssets + styles + '/!(fonts|font.variables)**/!(fonts | features)*.scss',
        srcAssets + styles + '/app.scss'],
      src: src + '/**/*.scss',
      stylesRoot: app + '/assets/styles/**/*.scss',
      styles: srcAssets + styles + '/**/*.scss',
      dest: app + '/assets/styles'
    },
    production: {
      source: app + '/assets/styles/*.css',
      dest: production + '/assets/styles'
    }
  },

  fonts: {
    source: app + fonts + '/**/*.+(eot|svg|tff|woff|woff2)',
    dest: production + fonts
  },

  images: {
    production: {
      source: app + '/assets/images/*.*',
      dest: productionAssets + '/images'
    }
  }

};
