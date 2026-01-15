const { XMLParser } = require('fast-xml-parser');
const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  
  // XML Parser configuration
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  });
  
  // Helper function to parse XML files
  function parseXML(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return xmlParser.parse(content);
    } catch (e) {
      console.log('Could not parse:', filePath);
      return null;
    }
  }
  
  // Load navigation data
  eleventyConfig.addGlobalData('navigation', () => {
    const navPath = path.join(__dirname, 'content/navigation.xml');
    if (fs.existsSync(navPath)) {
      return parseXML(navPath).navigation;
    }
    return {};
  });
  
  // Load all projects
  eleventyConfig.addGlobalData('projects', () => {
    const projects = [];
    const projectDirs = ['content/projects/content-design', 'content/projects/creative'];
    
    projectDirs.forEach(dir => {
      const fullDir = path.join(__dirname, dir);
      if (fs.existsSync(fullDir)) {
        fs.readdirSync(fullDir).forEach(file => {
          if (file.endsWith('.xml')) {
            const data = parseXML(path.join(fullDir, file));
            if (data && data.project) {
              projects.push({
                ...data.project,
                category: dir.includes('content-design') ? 'content-design' : 'creative'
              });
            }
          }
        });
      }
    });
    
    return projects;
  });
  
  // Load pages
  eleventyConfig.addGlobalData('pages', () => {
    const pages = {};
    const pagesDir = path.join(__dirname, 'content/pages');
    
    if (fs.existsSync(pagesDir)) {
      fs.readdirSync(pagesDir).forEach(file => {
        if (file.endsWith('.xml')) {
          const data = parseXML(path.join(pagesDir, file));
          if (data) {
            const pageType = Object.keys(data)[0];
            const pageData = data[pageType];
            if (pageData && pageData.meta && pageData.meta.id) {
              pages[pageData.meta.id] = pageData;
            }
          }
        }
      });
    }
    
    return pages;
  });
  
  // Load blog posts
  eleventyConfig.addGlobalData('posts', () => {
    const posts = [];
    const blogDir = path.join(__dirname, 'content/blog');
    
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir).forEach(file => {
        if (file.endsWith('.xml')) {
          const data = parseXML(path.join(blogDir, file));
          if (data && data.post) {
            posts.push(data.post);
          }
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
  });
  
  // Helper to find project by ID
  eleventyConfig.addFilter('findProject', (projects, id) => {
    return projects.find(p => p.meta && p.meta.id === id);
  });
  
  // Helper to filter projects by tag
  eleventyConfig.addFilter('withTag', (projects, tag) => {
    return projects.filter(p => p.meta && p.meta.tags && p.meta.tags.tag && p.meta.tags.tag.includes(tag));
  });
  
  // Pass through assets
  eleventyConfig.addPassthroughCopy('assets');
  
  // Watch for changes
  eleventyConfig.addWatchTarget('./content/');
  eleventyConfig.addWatchTarget('./assets/');
  
  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts'
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk'
  };
};
