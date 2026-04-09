import re
import os

docs_dir = "."
html_files = sorted([f for f in os.listdir(docs_dir) if f.endswith('.html') and os.path.isfile(f)])

print("\n" + "=" * 100)
print("CONTACT INFORMATION CONSISTENCY AUDIT")
print("=" * 100)

all_emails = {}
all_phones = {}
all_addresses = {}

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract emails
    emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', content)
    if emails:
        for email in emails:
            if email not in all_emails:
                all_emails[email] = []
            all_emails[email].append(html_file)
    
    # Extract phone patterns
    phone_patterns = re.findall(r'(?:tel|phone|tél|téléphone)[:\s]+([+\d\s\-\.()]+)', content, re.IGNORECASE)
    if phone_patterns:
        for phone in phone_patterns:
            clean_phone = phone.strip()
            if clean_phone not in all_phones:
                all_phones[clean_phone] = []
            all_phones[clean_phone].append(html_file)
    
    # Extract address patterns
    addresses = re.findall(r'(?:rue|avenue|boulevard|place|quai|street|road)[:\s]+([^\n<]+)', content, re.IGNORECASE)
    if addresses:
        for addr in addresses:
            clean_addr = addr.strip()[:50]
            if clean_addr not in all_addresses:
                all_addresses[clean_addr] = []
            all_addresses[clean_addr].append(html_file)

print("\nEMAIL ADDRESSES FOUND:")
if all_emails:
    for email, files in all_emails.items():
        print(f"  {email}")
        print(f"    Used in: {len(files)} file(s) - {', '.join([os.path.basename(f) for f in files])}")
else:
    print("  None")

print("\nPHONE NUMBERS FOUND:")
if all_phones:
    for phone, files in all_phones.items():
        print(f"  {phone}")
        print(f"    Used in: {len(files)} file(s) - {', '.join([os.path.basename(f) for f in files])}")
else:
    print("  None")

print("\nADDRESSES FOUND:")
if all_addresses:
    for addr, files in all_addresses.items():
        print(f"  {addr}")
        print(f"    Used in: {len(files)} file(s) - {', '.join([os.path.basename(f) for f in files])}")
else:
    print("  None")

# Check for inconsistencies
print("\n" + "=" * 100)
print("CONSISTENCY ISSUES:")
print("=" * 100)

if len(all_emails) > 1:
    print(f"\n⚠ MULTIPLE EMAIL ADDRESSES ({len(all_emails)}) - Should consolidate:")
    for email in all_emails:
        print(f"   - {email}")
else:
    print("\n✓ Email addresses consistent")

if len(all_phones) > 1:
    print(f"\n⚠ MULTIPLE PHONE NUMBERS ({len(all_phones)}) - Review for consistency:")
    for phone in all_phones:
        print(f"   - {phone}")
else:
    print("\n✓ Phone numbers consistent")

