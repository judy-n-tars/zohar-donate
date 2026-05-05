# Help Zohar — Donation Landing Page

A donation landing page with a progress meter, donor count, and "Donate now" button that links to the actual donation page.

## Quick Start

1. Open `index.html` in a browser, or serve locally:
   ```bash
   npx serve .
   ```
2. Customize `app.js` — update the `CONFIG` object at the top with:
   - `goalAmount` — fundraising goal
   - `currentAmount` — amount raised so far
   - `donorCount` — number of donors
   - `daysLeft` — campaign days remaining
   - `donateUrl` — your actual donation page URL
   - `donors` — array of recent donors `{ name, amount, time }`
3. Replace the hero image in `index.html` with a real photo of Zohar

## Customization

- **Hero image:** Replace the `<img src="...">` in `index.html` with your own image
- **Story text:** Edit the story section in `index.html`
- **Colors:** Edit CSS variables at the top of `styles.css`
- **Goal/amount:** Edit the `CONFIG` object in `app.js`

## Deployment

Deployed to GitHub Pages. Push to `main` and it goes live.

## Structure

```
zohar-donate/
├── index.html   # Main page
├── styles.css   # All styling
├── app.js       # Config & progress animation
└── README.md    # This file
```

## License

MIT
