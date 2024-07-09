const htmlmin = require('html-minifier')
const {eleventyImagePlugin} = require("@11ty/eleventy-img")
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const now = String(Date.now())

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('tailwind.config.js')
    eleventyConfig.addWatchTarget('tailwind.css')
    eleventyConfig.addPassthroughCopy('favicon.png')
    eleventyConfig.addPassthroughCopy('avatar2023.png')
    eleventyConfig.addPassthroughCopy({ './node_modules/alpinejs/dist/cdn.js': './alpine.js' })

	// WebC
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			// …
			// Add as a global WebC component
			"npm:@11ty/eleventy-img/*.webc",
		],
	});

	// Image plugin
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["webp", "jpeg"],
		urlPath: "/img/",

		// Notably `outputDir` is resolved automatically
		// to the project output directory

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
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