import os

os.makedirs("public", exist_ok=True)

# ── ROBOTS.TXT ──
robots = """User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://tryiteducations.net/sitemap.xml

Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
"""
open("public/robots.txt", "w").write(robots)
print("robots.txt created")

# ── SITEMAP.XML ──
sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- MAIN PAGES -->
  <url>
    <loc>https://tryiteducations.net/</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/pricing</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- STUDENT PAGES -->
  <url>
    <loc>https://tryiteducations.net/student</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/games</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/rank</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/analytics</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/pulse</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/guruhub</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/launchpad</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/tournament</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/hall</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/community</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/career</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/bookmarks</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/student/mentor</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- GAMES -->
  <url>
    <loc>https://tryiteducations.net/games/gk-blitz</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/math-blitz</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/word-rush</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/logic-grid</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/number-series</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/speed-reading</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/sports-mastery</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/current-affairs</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/games/daily-challenge</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- AUTH -->
  <url>
    <loc>https://tryiteducations.net/login</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/register</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- LEGAL -->
  <url>
    <loc>https://tryiteducations.net/privacy</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://tryiteducations.net/terms</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>

</urlset>"""
open("public/sitemap.xml", "w").write(sitemap)
print("sitemap.xml created")

# ── MANIFEST.JSON ──
manifest = """{
  "name": "TryIT Educations",
  "short_name": "TryIT",
  "description": "India's only lifelong exam platform. Class 1 to SWAYAM. 1,10,000+ exams in 42 languages.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0F2140",
  "theme_color": "#1E3A5F",
  "orientation": "portrait",
  "icons": [
    {"src": "/tryit-logo.webp", "sizes": "192x192", "type": "image/webp"},
    {"src": "/tryit-logo.webp", "sizes": "512x512", "type": "image/webp"}
  ]
}"""
open("public/manifest.json", "w").write(manifest)
print("manifest.json created")

print("All static files created in public/")
