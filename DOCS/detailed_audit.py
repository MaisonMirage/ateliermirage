import re
import os

docs_dir = "."
html_files = sorted([f for f in os.listdir(docs_dir) if f.endswith('.html') and os.path.isfile(f)])

print("\n" + "=" * 100)
print("DETAILED HTML AUDIT - ATELIER MIRAGE DOCUMENTATION")
print("=" * 100)

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    print(f"\n{'=' * 100}")
    print(f"FILE: {html_file}")
    print(f"{'=' * 100}")
    
    # 1. BRAND NAME ANALYSIS
    print("\n1. BRAND NAME CONSISTENCY")
    brand_variations = {
        "Atelier Mirage": content.count("Atelier Mirage"),
        "Maison Mirage": content.count("Maison Mirage"),
        "La Maison Mirage": content.count("La Maison Mirage"),
    }
    for brand, count in brand_variations.items():
        if count > 0:
            print(f"   - '{brand}': {count} occurrences")
    if brand_variations["Maison Mirage"] > 0 or brand_variations["La Maison Mirage"] > 0:
        print("   ⚠ WARNING: Found incorrect brand names!")
    
    # 2. TAGLINE
    print("\n2. TAGLINE CONSISTENCY")
    if "L'art du dessert" in content:
        count = content.count("L'art du dessert")
        print(f"   ✓ Tagline 'L'art du dessert' found: {count} occurrences")
    elif "art du dessert" in content:
        print("   ⚠ WARNING: Tagline variant 'art du dessert' found (missing apostrophe)")
    else:
        print("   ✗ Tagline 'L'art du dessert' NOT FOUND")
    
    # 3. LOGO REFERENCES
    print("\n3. LOGO REFERENCES")
    old_logos = ["logo maison mirage black", "logo-m-beige", "logo-m-cream"]
    new_logos = ["logo-am-ink.png", "logo-am-gold.png"]
    
    found_old = False
    for old_logo in old_logos:
        if old_logo in content:
            print(f"   ✗ Old logo reference: {old_logo}")
            found_old = True
    
    found_new = False
    for new_logo in new_logos:
        if new_logo in content:
            print(f"   ✓ New logo reference: {new_logo}")
            found_new = True
    
    if not found_old and not found_new:
        print("   - No logo references found in this file")
    
    # 4. DESIGN SYSTEM COLORS
    print("\n4. DESIGN SYSTEM COLORS")
    colors = {
        "cream": "#FAF5EF",
        "ink": "#1A1714",
        "gold": "#A8895C",
        "gold-light": "#C9AA7C"
    }
    for color_name, hex_val in colors.items():
        if hex_val in content:
            count = content.count(hex_val)
            print(f"   ✓ {color_name} ({hex_val}): {count} occurrences")
        else:
            print(f"   ✗ {color_name} ({hex_val}): NOT FOUND")
    
    # 5. FONTS
    print("\n5. FONT CONSISTENCY")
    fonts = {
        "Cormorant Garamond": "serif",
        "Outfit": "sans-serif"
    }
    for font_name, font_type in fonts.items():
        if font_name in content:
            count = content.count(font_name)
            print(f"   ✓ {font_name} ({font_type}): {count} references")
        else:
            print(f"   - {font_name}: not referenced")
    
    # 6. PRINT READINESS
    print("\n6. PRINT READINESS")
    has_media_print = "@media print" in content
    has_page_break = "page-break" in content or "break-inside" in content or "break-after" in content
    has_page_size = "@page" in content
    
    if has_media_print:
        print("   ✓ @media print rules present")
    else:
        print("   ✗ @media print rules missing")
    
    if has_page_break:
        print("   ✓ Page break styles present")
    else:
        print("   ✗ Page break styles missing")
    
    if has_page_size:
        print("   ✓ @page size rules present")
    else:
        print("   - @page size rules not found")
    
    # 7. SPELLING & FORMATTING
    print("\n7. SPELLING & FORMATTING ISSUES")
    spelling_issues = []
    
    # Check for common French/English mix-ups
    if " teh " in content.lower():
        spelling_issues.append("'teh' instead of 'the'")
    if "recieve" in content.lower():
        spelling_issues.append("'recieve' instead of 'receive'")
    if "concieve" in content.lower():
        spelling_issues.append("'concieve' instead of 'conceive'")
    
    # Check HTML structure
    if content.count("<h1>") != content.count("</h1>"):
        spelling_issues.append("Mismatched <h1> tags")
    if content.count("<h2>") != content.count("</h2>"):
        spelling_issues.append("Mismatched <h2> tags")
    
    if spelling_issues:
        for issue in spelling_issues:
            print(f"   ✗ {issue}")
    else:
        print("   ✓ No obvious spelling or formatting issues")
    
    # 8. CONTACT INFORMATION
    print("\n8. CONTACT INFORMATION")
    
    # Email
    emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', content)
    if emails:
        print(f"   ✓ Email(s) found: {', '.join(set(emails))}")
    else:
        print("   - No email addresses found")
    
    # Phone
    phones = re.findall(r'(?:tel|phone|tél|téléphone)[:\s]+([+\d\s\-\.()]+)', content, re.IGNORECASE)
    if phones:
        print(f"   ✓ Phone number(s) found")
    else:
        print("   - No phone numbers found")
    
    # Address
    if re.search(r'\b(rue|avenue|boulevard|place|quai|street|road)\b', content, re.IGNORECASE):
        print("   ✓ Address-like content found")
    else:
        print("   - No address keywords found")

print("\n" + "=" * 100)
