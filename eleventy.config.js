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

    console.log('📁 Looking for pages in:', pagesDir);
    console.log('📁 Directory exists?', fs.existsSync(pagesDir));

    if (fs.existsSync(pagesDir)) {
      const files = fs.readdirSync(pagesDir);
      console.log('📄 Files found:', files);

      files.forEach(file => {
        if (file.endsWith('.xml')) {
          console.log('🔍 Processing:', file);
          const data = parseXML(path.join(pagesDir, file));
          console.log('📊 Parsed data:', JSON.stringify(data, null, 2));

          if (data) {
            const pageType = Object.keys(data)[0];
            const pageData = data[pageType];
            console.log('🔑 Page type:', pageType);
            console.log('📄 Page data:', JSON.stringify(pageData, null, 2));

            if (pageData && pageData.meta && pageData.meta.id) {
              console.log('✅ Adding page:', pageData.meta.id);
              pages[pageData.meta.id] = pageData;
            } else {
              console.log('❌ Missing meta.id for file:', file);
            }
          }
        }
      });
    }

    console.log('📦 Final pages object:', JSON.stringify(pages, null, 2));
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
