import { Gulpclass, Task } from 'gulpclass/Decorators';
import * as  bump from 'gulp-bump';
import * as  gulp from 'gulp';
import * as  del from 'del';
import * as  fs from 'fs';
import * as  merge from 'merge2';
import * as  typescript from 'gulp-typescript';

const exec = require('child_process').exec;
const Server = require('karma').Server;

@Gulpclass()
export class Gulpfile {

    private sourceRoot: string = process.cwd();

    @Task('test')
    test(cb: Function): void {
        new Server({
            configFile: this.sourceRoot + '/karma.conf.js',
            singleRun: true
        }, cb).start();
    }

    @Task('clean')
    clean(): Promise<string[]> {
        return del(['./dist/**']);
    }

    @Task('bump')
    bump(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.clean().then(() => {
                gulp.src('package.json')
                    .pipe(bump({
                        type: 'patch'
                    }))
                    .pipe(gulp.dest('./'));
                resolve();
            });
        });
    }

    @Task('bundle')
    bundle(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.bump().then(() => {
                const tsResult = gulp.src('src/*.ts')
                    .pipe(typescript({
                        module: 'commonjs',
                        target: 'es5',
                        noImplicitAny: true,
                        experimentalDecorators: true,
                        outDir: 'dist/',
                        rootDir: 'src/',
                        sourceMap: true,
                        declaration: true,
                        moduleResolution: 'node',
                        removeComments: false,
                        lib: [
                            'es2017',
                            'dom'
                        ],
                        types: ['jasmine']
                    }));

                merge([
                    tsResult.dts.pipe(gulp.dest('dist/')),
                    tsResult.js.pipe(gulp.dest('dist/'))
                ]);
                setTimeout(() => {
                    // FIXME : hack : add "import { adal } from 'adal-angular';" to adal8.service.d.ts
                    const adal8ServiceFileName: string = `${this.sourceRoot}/dist/adal8.service.d.ts`;
                    let adal8ServiceFile: string = fs.readFileSync(adal8ServiceFileName, 'utf8');
                    adal8ServiceFile = `import { adal } from 'adal-angular';\r\n${adal8ServiceFile}`;
                    fs.writeFileSync(adal8ServiceFileName, adal8ServiceFile, 'utf-8');

                    resolve();
                }, 5000);
            });
        });
    }

    @Task('copy')
    copy(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.bundle().then(() => {
                gulp.src(['src/adal-angular.d.ts', 'README.md', 'LICENSE'])
                    .pipe(gulp.dest('dist/'));
                resolve();
            });
        });
    }

    @Task('package')
    package(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.copy().then(() => {
                const pkgjson = JSON.parse(fs.readFileSync(`${this.sourceRoot}/package.json`, 'utf8'));
                delete pkgjson.scripts;
                delete pkgjson.devDependencies;
                pkgjson.peerDependencies = pkgjson.dependencies;
                delete pkgjson.dependencies;
                fs.writeFileSync(`${this.sourceRoot}/dist/package.json`, JSON.stringify(pkgjson, null, 2), 'utf-8');
                resolve();
            });
        });
    }

    @Task('publish')
    publish(cb: Function): Promise<void> {
        return new Promise<void>((resolve) => {
            this.package().then(() => {
                exec('npm publish ./dist', (err: any, stdout: any, stderr: any) => {
                    console.log(stdout);
                    console.log(stderr);
                    cb(err);
                });
                resolve();
            });
        });
    }
}