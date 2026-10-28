# Chrome Web Store Submission Guide

This guide walks you through publishing the Cover Letter Generator extension to the Chrome Web Store.

## Prerequisites

Before you begin, ensure you have:

- [ ] A Google account
- [ ] $5 USD one-time developer registration fee
- [ ] The built package: `../release/lettredemotivation-ext-v2.0.0.zip`
- [ ] Screenshots of the extension (3-5 recommended)
- [ ] Promotional images (optional but recommended)

## Step 1: Register as a Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the one-time $5 registration fee
4. Accept the developer agreement

## Step 2: Prepare Required Assets

### Screenshots (Required)

Create 3-5 screenshots showing:

1. **Main Interface** - Extension popup with job description input
   - Size: 1280x800px (recommended) or 640x400px
   - Format: PNG or JPEG

2. **Settings Page** - Configuration screen
   - Size: 1280x800px (recommended) or 640x400px
   - Format: PNG or JPEG

3. **Generated Result** - Modal with completed cover letter
   - Size: 1280x800px (recommended) or 640x400px
   - Format: PNG or JPEG

**How to capture:**
```bash
# Open the extension in Chrome
# Use Command+Shift+4 (Mac) or Snipping Tool (Windows)
# Capture the extension popup (make sure it's 1280x800 or 640x400)
```

### Promotional Images (Optional but Recommended)

**Small Tile (440x280px):**
- Shows extension icon and name
- Used in search results

**Large Tile (920x680px):**
- Featured promotional image
- Used in featured sections

**Marquee (1400x560px):**
- Banner for special promotions
- Only if Google selects your extension for promotion

## Step 3: Create a New Item

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"** button
3. Upload `../release/lettredemotivation-ext-v2.0.0.zip`
4. Click **"Upload"**

## Step 4: Fill Out the Store Listing

### Product Details Tab

**Extension Name:**
```
Cover Letter Generator - AI Powered
```

**Summary (132 characters max):**
```
Generate personalized cover letters instantly with AI. Works with Indeed, Welcome to the Jungle & all job sites. Dark mode UI.
```

**Description:**
```
Copy the detailed description from CHROME_STORE_LISTING.md
```

**Category:**
- Primary: Productivity
- (No secondary category needed)

**Language:**
- English (default)
- Add French support if desired

### Graphic Assets Tab

1. **Upload Screenshots:**
   - Minimum 1, recommended 3-5
   - Size: 1280x800 or 640x400 pixels
   - PNG or JPEG format

2. **Small Promotional Tile (440x280):** (Required)
   - Upload your small tile image

3. **Large Promotional Tile (920x680):** (Optional)
   - Upload if you have one

4. **Marquee Promotional Tile (1400x560):** (Optional)
   - Upload if you have one

### Privacy Tab

**Single Purpose:**
```
This extension generates personalized cover letters using AI by analyzing job descriptions and user resumes.
```

**Permission Justifications:**

For **storage:**
```
Required to save user's API key, resume text, and preferences locally in the browser.
```

For **activeTab:**
```
Required to interact with the current job listing page for enhanced user experience.
```

For **scripting:**
```
Required to inject content scripts that enable seamless integration with job sites.
```

For **host_permissions (api.openai.com):**
```
Required to communicate with OpenAI's API to generate cover letters using the user's API key.
```

**Privacy Policy URL:**
```
https://raw.githubusercontent.com/ogrre/lettredemotivation-ext/main/PRIVACY_POLICY.md
```

**Data Usage:**
- Check: "This extension does NOT collect or transmit user data"
- (Note: It only uses local storage and communicates with OpenAI)

### Pricing & Distribution Tab

**Visibility:**
- Select: **Public** (recommended)
- Or: **Unlisted** (only people with link can find it)

**Distribution:**
- Select: **All regions** (or specific countries if preferred)

**Pricing:**
- Select: **Free**

## Step 5: Submit for Review

1. Review all information carefully
2. Click **"Submit for Review"**
3. Wait for Google's review (typically 1-3 business days, can be up to several weeks)

## Step 6: Post-Submission

### Monitor Review Status

Check your [Developer Dashboard](https://chrome.google.com/webstore/devconsole) regularly for:
- Review status updates
- Rejection reasons (if any)
- Publication confirmation

### If Rejected

Common rejection reasons:
1. **Permissions not justified** - Revise justifications
2. **Misleading description** - Ensure accurate representation
3. **Privacy policy issues** - Update privacy policy
4. **Incomplete listing** - Add missing information

Fix issues and resubmit.

### After Approval

1. **Verify Installation:**
   ```
   https://chrome.google.com/webstore/detail/[YOUR-EXTENSION-ID]
   ```

2. **Update GitHub Repository:**
   - Add Chrome Web Store badge to README
   - Add installation link

3. **Promote Your Extension:**
   - Share on social media
   - Post on Product Hunt
   - Update your website (lettredemotivation.app)

4. **Monitor Reviews:**
   - Respond to user reviews
   - Address bug reports
   - Update based on feedback

## Troubleshooting

### Common Issues

**"Package is invalid"**
- Ensure manifest.json is valid
- Check all file paths are correct
- Verify icons exist (16x16, 48x48, 128x128)

**"Icon not found"**
- Make sure icons/ folder contains all required sizes
- Verify icon paths in manifest.json

**"Permission not justified"**
- Provide more detailed justification
- Explain exact use case for each permission

**"Privacy policy required"**
- Ensure privacy policy URL is accessible
- Must be publicly available (GitHub raw URL works)

## Chrome Web Store Review Guidelines

Your extension must comply with:
- [Chrome Web Store Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/developer-program-policies/)
- [Quality Guidelines](https://developer.chrome.com/docs/webstore/program-policies/quality-guidelines/)

Key points:
- ✅ Single purpose (cover letter generation)
- ✅ Minimal permissions
- ✅ Clear privacy policy
- ✅ No deceptive practices
- ✅ Quality user interface
- ✅ Functional and bug-free

## Updates and Versioning

To publish updates:

1. Update version in `manifest.json`
2. Update the version in `manifest.json` and run `npm run build:release`
3. Upload new ZIP to Developer Dashboard
4. Submit for review again

## Support Resources

- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Extension Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)
- [Chrome Web Store Dashboard](https://chrome.google.com/webstore/devconsole)
- [Chrome Extensions Discord](https://discord.gg/google-dev)

## Checklist

Before submitting, verify:

- [ ] Extension package built successfully
- [ ] Manifest.json is clean (no Firefox-specific settings)
- [ ] All icons present (16, 48, 128)
- [ ] Privacy policy accessible online
- [ ] Screenshots prepared (3-5)
- [ ] Store listing text ready
- [ ] Permission justifications written
- [ ] Single purpose clearly stated
- [ ] Extension tested and working
- [ ] No console errors
- [ ] All features functional
- [ ] README updated
- [ ] GitHub repository public

## Timeline

**Expected Timeline:**
- Submission: 15 minutes
- Review: 1-3 business days (can be longer)
- Total: ~3-7 days until public

**After Approval:**
- Extension goes live immediately
- Appears in search within 24 hours
- Full indexing within 1 week

---

Good luck with your submission! 🚀

If you encounter any issues, refer to the [Chrome Web Store documentation](https://developer.chrome.com/docs/webstore/) or file an issue on GitHub.
