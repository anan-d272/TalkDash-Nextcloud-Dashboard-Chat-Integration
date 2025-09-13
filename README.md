# TalkDash – Nextcloud Talk Dashboard Widget

**TalkDash** is a custom Nextcloud app that adds a **dashboard widget** for Talk.  
It provides quick access to mentions, conversations, and updates from the Talk app directly on the Nextcloud dashboard.

---

## Features
- Adds a **Talk widget** to the Nextcloud Dashboard.
- Shows recent Talk mentions and conversations.
- Provides one-click access to open Talk.

---

## Requirements
- Nextcloud 25+ (tested on Nextcloud 27/28/29)
- PHP 8.0+
- Enabled **Talk app** in Nextcloud
- Admin access to your Nextcloud server

---

## Installation
1. Clone or copy this repository into your Nextcloud `custom_apps/` directory:
   ```bash
   cd /var/www/html/nextcloud/custom_apps/
   git clone https://github.com/your-repo/talkdash.git
   ```
   Or copy manually:
   ```bash
   cp -r talkdash /var/www/html/nextcloud/custom_apps/
   ```

2. Enable the app:
   ```bash
   sudo -u www-data php /var/www/html/nextcloud/occ app:enable talkdash
   ```

3. Go to **Nextcloud Dashboard** → click **Customize** → enable **Talk Dashboard** widget.

---

## File Structure
```
talkdash/
├── appinfo/
│   └── info.xml
├── lib/
│   └── Dashboard/
│       └── TalkWidget.php
└── README.md
```

---

## Troubleshooting
- If the widget does not appear, run:
  ```bash
  sudo -u www-data php occ app:disable talkdash
  sudo -u www-data php occ app:enable talkdash
  ```
- Check `nextcloud.log` for app errors:
  ```bash
  tail -f /var/www/html/nextcloud/data/nextcloud.log
  ```

---

## License
MIT License
