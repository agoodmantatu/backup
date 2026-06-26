try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    # Create 1200x630 OG image
    img = Image.new("RGB", (1200, 630), color="#0F2140")
    draw = ImageDraw.Draw(img)

    # Navy gradient effect — draw rectangles
    for i in range(630):
        alpha = int(255 * (1 - i/630) * 0.3)
        draw.rectangle([0, i, 1200, i+1], fill=(30, 58, 95))

    # Gold accent bar at top
    draw.rectangle([0, 0, 1200, 6], fill="#C9A84C")
    draw.rectangle([0, 624, 1200, 630], fill="#C9A84C")

    # Left accent line
    draw.rectangle([60, 40, 66, 590], fill="#C9A84C")

    # Main text - use default font (no font file needed)
    draw.text((100, 80), "TryIT Educations", fill="#FFFFFF")
    draw.text((100, 160), "India's Only Lifelong Exam Platform", fill="#C9A84C")
    draw.text((100, 240), "Class 1 Olympiad  to  SWAYAM", fill="#93C5FD")
    draw.text((100, 320), "1,10,000+ Exams  |  42 Languages  |  All 36 States", fill="#E2E8F0")
    draw.text((100, 400), "JEE  NEET  UPSC  SSC  IBPS  RRB  TNPSC  All State PSC", fill="#CBD5E1")
    draw.text((100, 460), "Free for 11 Communities  |  No Ads  |  No Telecalling", fill="#86EFAC")
    draw.text((100, 520), "Free Tournaments  |  Mentor Earn 75%  |  Family Dashboard", fill="#CBD5E1")
    draw.text((100, 575), "tryiteducations.net", fill="#C9A84C")

    os.makedirs("public", exist_ok=True)
    img.save("public/og-image.png", "PNG", optimize=True)
    print("og-image.png created with PIL")

except ImportError:
    # Fallback — create SVG og image
    svg = """<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F2140"/>
      <stop offset="100%" stop-color="#1E3A5F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#C9A84C"/>
  <rect x="0" y="624" width="1200" height="6" fill="#C9A84C"/>
  <rect x="60" y="40" width="6" height="550" fill="#C9A84C"/>
  <text x="100" y="130" font-family="Arial" font-weight="900" font-size="72" fill="white">TryIT Educations</text>
  <text x="100" y="200" font-family="Arial" font-weight="700" font-size="36" fill="#C9A84C">India&#39;s Only Lifelong Exam Platform</text>
  <text x="100" y="270" font-family="Arial" font-size="30" fill="#93C5FD">Class 1 Olympiad to SWAYAM</text>
  <text x="100" y="330" font-family="Arial" font-size="26" fill="#E2E8F0">1,10,000+ Exams | 42 Languages | All 36 States</text>
  <text x="100" y="390" font-family="Arial" font-size="24" fill="#CBD5E1">JEE | NEET | UPSC | SSC | IBPS | RRB | TNPSC | All State PSC</text>
  <text x="100" y="450" font-family="Arial" font-size="24" fill="#86EFAC">Free for 11 Communities | No Ads | No Telecalling</text>
  <text x="100" y="510" font-family="Arial" font-size="22" fill="#CBD5E1">Free Tournaments | Mentor Earn 75% | Family Dashboard</text>
  <text x="100" y="590" font-family="Arial" font-weight="700" font-size="28" fill="#C9A84C">tryiteducations.net</text>
</svg>"""
    import os
    os.makedirs("public", exist_ok=True)
    open("public/og-image.svg", "w").write(svg)
    # Convert SVG to PNG name (browsers accept SVG for OG in many cases)
    open("public/og-image.png", "wb").write(svg.encode())
    print("og-image created as SVG fallback")
