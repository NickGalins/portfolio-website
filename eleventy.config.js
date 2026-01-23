// ============================================================================
// ELEVENTY CONFIGURATION FILE
// ============================================================================
// This file tells Eleventy (the static site generator) how to build your site.
// It handles:
// 1. Reading XML content files (projects, pages, blog posts)
// 2. Making that data available to your .njk templates
// 3. Configuring how files are processed and where output goes
// ============================================================================

// IMPORT REQUIRED LIBRARIES
// These are Node.js modules that let us work with files and parse XML
const { XMLParser } = require('fast-xml-parser');  // Converts XML to JavaScript objects
const fs = require('fs');                           // File system - read/write files
const path = require('path');                       // Handle file paths correctly

// MAIN CONFIGURATION FUNCTION
// Eleventy calls this function when building your site
module.exports = function(eleventyConfig) {

  // -------------------------------------------------------------------------
  // XML PARSER SETUP
  // -------------------------------------------------------------------------
  // This creates an XML parser that converts your .xml content files into
  // JavaScript objects that templates can use
  const xmlParser = new XMLParser({
    ignoreAttributes: false,        // Keep XML attributes like <tag attr="value">
    attributeNamePrefix: "@_",      // Prefix attributes with @_ to avoid conflicts
    cdataPropName: "__cdata"        // Parse CDATA sections into __cdata property
  });

  // -------------------------------------------------------------------------
  // HELPER FUNCTION: parseXML()
  // -------------------------------------------------------------------------
  // This function reads an XML file and converts it to a JavaScript object
  // Used by all the data loading functions below
  function parseXML(filePath) {
    try {
      // Read the file as text
      const content = fs.readFileSync(filePath, 'utf-8');
      // Parse the XML text into a JavaScript object
      return xmlParser.parse(content);
    } catch (e) {
      // If something goes wrong, log it and return null
      console.log('Could not parse:', filePath);
      return null;
    }
  }
  
  // -------------------------------------------------------------------------
  // LOAD NAVIGATION DATA
  // -------------------------------------------------------------------------
  // This reads content/navigation.xml and makes it available as {{ navigation }}
  // in all your templates. The navigation.xml file defines your sidebar menu.
  eleventyConfig.addGlobalData('navigation', () => {
    // Build the full path to navigation.xml
    const navPath = path.join(__dirname, 'content/navigation.xml');
    // Check if the file exists
    if (fs.existsSync(navPath)) {
      // Parse the XML and return just the 'navigation' part
      return parseXML(navPath).navigation;
    }
    // If file doesn't exist, return empty object so templates don't break
    return {};
  });
  
  // -------------------------------------------------------------------------
  // LOAD ALL PROJECTS
  // -------------------------------------------------------------------------
  // This reads all XML files from your project folders and makes them
  // available as {{ projects }} in templates. Each project gets tagged with
  // its category (case-studies or individual-samples).
  eleventyConfig.addGlobalData('projects', () => {
    const projects = [];  // Start with empty array
    // Look in both project directories
    const projectDirs = ['content/projects/case-studies', 'content/projects/individual-samples', 'content/projects/content-history'];

    // Loop through each directory
    projectDirs.forEach(dir => {
      const fullDir = path.join(__dirname, dir);
      // Check if directory exists
      if (fs.existsSync(fullDir)) {
        // Read all files in the directory
        fs.readdirSync(fullDir).forEach(file => {
          // Only process XML files
          if (file.endsWith('.xml')) {
            const data = parseXML(path.join(fullDir, file));
            // Make sure we got valid project data
            if (data && data.project) {
              projects.push({
                ...data.project,  // Spread operator: copies all properties from data.project
                // Add a 'category' field based on which folder it came from
                category: dir.includes('case-studies') ? 'case-studies' :
                         dir.includes('individual-samples') ? 'individual-samples' : 'content-history'
              });
            }
          }
        });
      }
    });

    return projects;  // Return the array of all projects
  });
  
  // -------------------------------------------------------------------------
  // LOAD PAGES (About, Contact, Resume)
  // -------------------------------------------------------------------------
  // This reads XML files from content/pages/ and makes them available as
  // {{ pages.about }}, {{ pages.contact }}, etc. in your templates.
  // The 'id' in each XML file's <meta> tag determines the property name.
  //
  // NOTE: This uses "immediate execution" (runs when config loads) instead
  // of a lazy function, which ensures the data is available when needed.
  const pages = {};  // Empty object to store pages
  const pagesDir = path.join(__dirname, 'content/pages');

  if (fs.existsSync(pagesDir)) {
    // Read all files in the pages directory
    const files = fs.readdirSync(pagesDir);

    files.forEach(file => {
      // Only process XML files
      if (file.endsWith('.xml')) {
        const data = parseXML(path.join(pagesDir, file));

        if (data) {
          // Get all keys from the parsed XML
          const keys = Object.keys(data);
          // Skip the ?xml declaration and find the actual content element
          // (could be 'page', 'resume', etc.)
          const pageType = keys.find(key => key !== '?xml');
          // Get the actual page data
          const pageData = data[pageType];

          // Check if page has required meta.id field
          if (pageData && pageData.meta && pageData.meta.id) {
            // Add to pages object using the id as the key
            // Example: <meta><id>about</id></meta> becomes pages['about']
            pages[pageData.meta.id] = pageData;
          }
        }
      }
    });
  }

  // Make the pages object available to all templates
  eleventyConfig.addGlobalData('pages', pages);
  
  // -------------------------------------------------------------------------
  // LOAD BLOG POSTS
  // -------------------------------------------------------------------------
  // This reads XML files from content/blog/ and makes them available as
  // {{ posts }} in templates. Posts are automatically sorted by date (newest first).
  eleventyConfig.addGlobalData('posts', () => {
    const posts = [];  // Empty array to store posts
    const blogDir = path.join(__dirname, 'content/blog');

    if (fs.existsSync(blogDir)) {
      // Read all files in the blog directory
      fs.readdirSync(blogDir).forEach(file => {
        if (file.endsWith('.xml')) {
          const data = parseXML(path.join(blogDir, file));
          if (data && data.post) {
            posts.push(data.post);
          }
        }
      });
    }

    // Sort posts by date, newest first
    // Compares dates: b.meta.date - a.meta.date gives reverse chronological order
    return posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
  });

  // -------------------------------------------------------------------------
  // CUSTOM FILTERS (Helper Functions for Templates)
  // -------------------------------------------------------------------------
  // Filters let you transform data in templates using the pipe syntax: {{ data | filterName }}

  // FILTER: findProject
  // Usage in template: {{ projects | findProject('project-id') }}
  // Searches the projects array for one with matching meta.id
  eleventyConfig.addFilter('findProject', (projects, id) => {
    return projects.find(p => p.meta && p.meta.id === id);
  });

  // FILTER: withTag
  // Usage in template: {{ projects | withTag('ux-writing') }}
  // Returns only projects that have the specified tag
  eleventyConfig.addFilter('withTag', (projects, tag) => {
    return projects.filter(p => p.meta && p.meta.tags && p.meta.tags.tag && p.meta.tags.tag.includes(tag));
  });

  // -------------------------------------------------------------------------
  // ASSET HANDLING
  // -------------------------------------------------------------------------
  // This tells Eleventy to copy the 'assets' folder directly to the output
  // without processing it. Your CSS, JS, images, videos all go through here.
  eleventyConfig.addPassthroughCopy('assets');

  // -------------------------------------------------------------------------
  // WATCH TARGETS (Live Reload During Development)
  // -------------------------------------------------------------------------
  // When you run 'npm run dev', Eleventy watches these folders for changes
  // and automatically rebuilds the site when you edit files.
  eleventyConfig.addWatchTarget('./content/');   // Watch all XML content files
  eleventyConfig.addWatchTarget('./assets/');    // Watch CSS, JS, images, etc.
  
  // -------------------------------------------------------------------------
  // IGNORE PATTERNS
  // -------------------------------------------------------------------------
  // Tell Eleventy to ignore certain files that shouldn't be processed as templates
  eleventyConfig.ignores.add('context.md');    // Documentation file with template syntax examples
  eleventyConfig.ignores.add('README.md');      // Project README
  eleventyConfig.ignores.add('CARD-IMAGES.md'); // Card images documentation
  eleventyConfig.ignores.add('TAG-SYSTEM.md');  // Tag system documentation
  eleventyConfig.ignores.add('CHANGELOG.md');   // Version history
  eleventyConfig.ignores.add('Context/**');     // AI assistant context files

  // -------------------------------------------------------------------------
  // ELEVENTY CONFIGURATION OBJECT
  // -------------------------------------------------------------------------
  // This return object tells Eleventy where to find files and how to process them
  return {
    dir: {
      input: '.',                      // Look for templates in the root directory
      output: '_site',                 // Put the built site in the _site folder
      includes: '_includes',           // Look for layout/partial templates in _includes
      layouts: '_includes/layouts'     // Look for layout templates here (not currently used)
    },
    templateFormats: ['njk', 'html', 'md'],  // Process these file types as templates
    htmlTemplateEngine: 'njk'          // Use Nunjucks for processing HTML files
  };
};
