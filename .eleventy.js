const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (
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

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            data: "data",
            includes: "includes",
            layouts: "layouts",
            output: "_site",
        },
    };
};