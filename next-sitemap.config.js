/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.WEBSITE_URL || 'https://warden.techanv.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out', // static export output dir (output: 'export')
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: ['https://warden.techanv.com/sitemap.xml'],
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: path === '/' ? 1.0 : config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
}
