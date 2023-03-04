const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('images')
    eleventyConfig.addPassthroughCopy('fonts')
    eleventyConfig.addPassthroughCopy({ './node_modules/alpinejs/dist/cdn.js': './alpine.js' })
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