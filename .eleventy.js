const htmlmin = require('html-minifier')
const Image = require("@11ty/eleventy-img")
const now = String(Date.now())

async function imageShortcode(src, alt, sizes, imgClass) {
    if(alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }

    let metadata = await Image(src, {
        widths: [300, 600, 1200],
        formats: ['webp', 'jpg', 'png'],
        urlPath: "/images/",
        outputDir: "./_site/images/"
    });

    let lowsrc = metadata.png[0];
    let highsrc = metadata.png[metadata.png.length - 1];

    return `<picture>
        ${Object.values(metadata).map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
        }).join("\n")}
        <img
            src="${lowsrc.url}"
            width="${highsrc.width}"
            height="${highsrc.height}"
            alt="${alt}"
            class="${imgClass}"
            loading="lazy"
            decoding="async">
        </picture>`;
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('tailwind.config.js')
    eleventyConfig.addWatchTarget('tailwind.css')
    eleventyConfig.addPassthroughCopy('images')
    eleventyConfig.addPassthroughCopy('fonts')
    eleventyConfig.addPassthroughCopy({ './node_modules/alpinejs/dist/cdn.js': './alpine.js' })
    eleventyConfig.addShortcode('version', function () {
        return now
    })
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
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