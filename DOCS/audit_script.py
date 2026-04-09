import re
import os
from pathlib import Path

# Define audit criteria
BRAND_NAMES = {
    "Atelier Mirage": "correct",
    "Maison Mirage": "incorrect",
    "La Maison Mirage": "incorrect",
    "Atelier Mirage": "correct"
}

TAGLINE = "L'art du dessert"
LOGO_FILES = ["logo-am-ink.png", "logo-am-gold.png"]
OLD_LOGOS = ["logo maison mirage black.png", "logo-m-beige.png", "logo-m-cream.jpg"]

COLORS = {
    "cream": "#FAF5EF",
    "ink": "#1A1714",
    "gold": "#A8895C",
    "gold-light": "#C9AA7C"
}

FONTS = {
    "Cormorant Garamond": "serif",
    "Outfit": "sans"
}

# Get all HTML files
docs_dir = "."
html_files = sorted([f for f in os.listdir(docs_dir) if f.endswith('.html') and os.path.isfile(f)])

results = {}

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    issues = {
        "brand_names": [],
        "tagline": None,
        "logo_references": [],
        "colors": [],
        "fonts": [],
        "print_readiness": [],
        "spelling_errors": [],
        "contact_info": [],
        "other_issues": []
    }
    
    # Check brand names
    if "Maison Mirage" in content and "Atelier Mirage" not in content:
        issues["brand_names"].append("Found 'Maison Mirage' instead of 'Atelier Mirage'")
    if "La Maison Mirage" in content:
        issues["brand_names"].append("Found 'La Maison Mirage' (should be 'Atelier Mirage')")
    
    # Check tagline
    if TAGLINE not in content:
        # Look for variations
        if "art du dessert" in content:
            issues["tagline"] = "Tagline present but possibly with incorrect formatting"
        else:
            issues["tagline"] = "Tagline 'L'art du dessert' not found"
    
    # Check logo references
    for old_logo in OLD_LOGOS:
        if old_logo in content or old_logo.replace(" ", "-") in content:
            issues["logo_references"].append(f"Old logo found: {old_logo}")
    
    # Check colors are used
    for color, hex_val in COLORS.items():
        if hex_val not in content:
            issues["colors"].append(f"Color {color} ({hex_val}) not found")
    
    # Check fonts
    for font in FONTS.keys():
        if font not in content:
            issues["fonts"].append(f"Font {font} not referenced")
    
    # Check print readiness
    if "@media print" not in content:
        issues["print_readiness"].append("No @media print rule found")
    if "page-break" not in content and "break-inside" not in content:
        issues["print_readiness"].append("No page break styles found")
    
    # Check for common spelling errors (French)
    spelling_checks = {
        "teh ": "the ",
        "recieve": "receive",
        "concieve": "conceive",
        " teh ": " the "
    }
    for typo, correct in spelling_checks.items():
        if typo in content.lower():
            issues["spelling_errors"].append(f"Possible typo: '{typo}' should be '{correct}'")
    
    # Check contact info
    contact_patterns = {
        "email": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        "phone": r'\b\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}\b',
        "address": r'\b(rue|avenue|boulevard|place|quai)\b'
    }
    
    contact_found = {}
    for contact_type, pattern in contact_patterns.items():
        if re.search(pattern, content):
            contact_found[contact_type] = True
    
    if contact_found:
        issues["contact_info"].append(f"Contact info found: {', '.join(contact_found.keys())}")
    
    results[html_file] = issues

# Print results
print("=" * 80)
print("HTML AUDIT REPORT - ATELIER MIRAGE DOCS")
print("=" * 80)
print()

for html_file, issues in results.items():
    print(f"\nFILE: {html_file}")
    print("-" * 80)
    
    has_issues = any(v for v in issues.values() if v)
    
    if not has_issues:
        print("✓ No issues found")
    else:
        if issues["brand_names"]:
            print(f"  Brand Names: {'; '.join(issues['brand_names'])}")
        
        if issues["tagline"]:
            print(f"  Tagline: {issues['tagline']}")
        
        if issues["logo_references"]:
            print(f"  Logo References: {'; '.join(issues['logo_references'])}")
        
        if issues["colors"]:
            print(f"  Colors: {'; '.join(issues['colors'])}")
        
        if issues["fonts"]:
            print(f"  Fonts: {'; '.join(issues['fonts'])}")
        
        if issues["print_readiness"]:
            print(f"  Print Readiness: {'; '.join(issues['print_readiness'])}")
        
        if issues["spelling_errors"]:
            print(f"  Spelling: {'; '.join(issues['spelling_errors'])}")
        
        if issues["contact_info"]:
            print(f"  Contact Info: {'; '.join(issues['contact_info'])}")
    
    print()

