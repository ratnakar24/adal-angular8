module.exports = function(config) {
    config.set({
        angularCli: {
            environment: 'dev'
        },
      browsers: ['Chrome'],
      frameworks: ['jasmine', 'karma-typescript'],
      plugins:[
        require('karma-jasmine'),
        require('karma-typescript'),
        require('karma-chrome-launcher'),
        require('@angular/cli/plugins/karma')
    ],
      files: [
        'src/**/*.spec.ts'
      ],
      preprocessors: {
        "src/**/*.ts": "karma-typescript" // *.ts
    },
    reporters: ["progress", "karma-typescript"],
    karmaTypescriptConfig: {
        compilerOptions: {
            target: "ES2015",
            lib: ["es2015", "es2017", "dom"]
        },
        tsconfig: "tsconfig.json"
    }
    });
  };