const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // allow dynamic partials, so we can load scan files as needed.
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  // Enable YAML data files, accounting for both .yml and .yaml extensions
  eleventyConfig.addDataExtension("yml", contents => yaml.safeLoad(contents));
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  // Add custom filter to check for string in template
  eleventyConfig.addFilter("is_string", function(value) {
    return typeof value == 'string';
  });
  eleventyConfig.addFilter("typeof", function(value) {
    if( typeof value && typeof value !=null) {
        return typeof value
    } else {
        return 'unknown'
    }
  });
  eleventyConfig.addFilter("extract_values", function(value) {
    if( typeof value === "object") {
        var returnstring = '<ul>';
        for (prop in value) {
        returnstring += `<li>${prop}: ${value[prop]}</li>`
        }
        return '</ul>' + returnstring
    } else {
        return value
    }
  });
};

