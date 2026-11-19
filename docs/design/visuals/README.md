# Visuals

| File | What it is | How to rebuild |
|---|---|---|
| `share-card.html` | Source of the link-preview card (`website/public/images/share-card.jpg`, 1200 × 630), shown when the site is shared on LinkedIn, Slack, WhatsApp and the like. Hive palette, the site icon, name, headline and tagline from `website/src/data/profile.json`; no photo. | Open it in headless Chrome at 1200 × 630 (`google-chrome --headless=new --window-size=1200,630 --virtual-time-budget=5000 --screenshot=share-card.png share-card.html`), save the PNG as JPEG (quality 90) to `website/public/images/share-card.jpg`. When the name or headline changes, edit the HTML first. A changed image needs a new file name, because the platforms cache link previews by image URL. |
