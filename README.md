# gulp-ccr-queue

Pipe queued streams progressively. A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install

``` bash
$ npm install --save-dev gulp-chef gulp-ccr-queue
```

## Recipe

Serial Join (from [gulp-cheatsheet](https://github.com/osscafe/gulp-cheatsheet) p.2)

## Ingredients

* [streamqueue](https://github.com/nfroidure/StreamQueue)

## Type

[Stream Processor](https://github.com/gulp-cookery/gulp-chef#writing-stream-processor)

## Usage

``` javascript
var gulp = require('gulp');
var chef = require('gulp-chef');

var meals = chef({
    'serial-join': {
        src: 'css/',
        dest: 'css/',
        pipe: {
            queue: {
                '.less': {
                    plugin: 'gulp-less',
                    src: 'first.less'
                },
                pipe: {
                    src: 'second.css',
                    '.cssimport': {
                        plugin: 'gulp-cssimport'
                    },
                    '.autoprefixer': {
                        plugin: 'gulp-autoprefixer',
                        options: 'last 2 versions'
                    }
                }
            },
            '.concat': {
                plugin: 'gulp-concat',
                options: 'app.css'
            },
            '.minify': {
                plugin: 'gulp-minify-css',
                spit: true
            }
        }
    }
});

gulp.registry(meals);
```
