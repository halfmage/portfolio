const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('./_tmp/style.css')
    eleventyConfig.addPassthroughCopy('work')
    eleventyConfig.addPassthroughCopy('fonts')
    eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
    eleventyConfig.addPassthroughCopy({ './node_modules/alpinejs/dist/cdn.js': './alpine.js' })
    eleventyConfig.addPassthroughCopy({ './node_modules/medium-zoom/dist/medium-zoom.min.js': './medium-zoom.js' })
    eleventyConfig.addShortcode('version', function () {
        return now
    })
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (
            process.env.ELEVENTY_PRODUCTION &&
            outputPath &&
            outputPath.endsWith('.html')
        ) {
        let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
        });
        return minified
        }
        return content
    })
};