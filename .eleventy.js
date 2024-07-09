const now = String(Date.now())
const Image = require("@11ty/eleventy-img");
const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('tailwind.config.js')
    eleventyConfig.addWatchTarget('tailwind.css')
    eleventyConfig.addPassthroughCopy('favicon.png')
    eleventyConfig.addPassthroughCopy('img')
    eleventyConfig.addPassthroughCopy({ './node_modules/alpinejs/dist/cdn.js': './alpine.js' })

	eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
		let metadata = await Image(src, {
			widths: [300, 600],
			formats: ["avif", "jpeg"],
		});

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});

    // HTML minifier
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
    }
};