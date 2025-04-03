# 📦 Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] - 2025-04-03

🎉 Initial public release of the **Directus ZeptoMail Extension**!

### ✨ Features

- Send transactional emails using **ZeptoMail HTTP API** (no SMTP needed)
- Admin UI settings module for configuring API token, sender address, and tracking options
- Supports `to`, `cc`, `bcc`, and `reply_to` fields
- Integration with Directus notification system for test email feedback
- Localized (English + Arabic)

### 🔒 Limitations

- Attachments not supported due to Directus limitations ([#22223](https://github.com/directus/directus/discussions/22223))
- ZeptoMail template API not used (Directus handles templates)
- Batch sending not fully supported — but multiple recipients are accepted via `to[]`

---

## [Unreleased]

- 🔧 Improve error handling with detailed logs
- 🧪 Add test email preview in UI
- 🌐 Add more language support (e.g., French)

---

> This project follows [Semantic Versioning](https://semver.org/).  
> Want to contribute? Check out our [GitHub Issues](https://github.com/nawafinity/directus-extension-zeptomail/issues).
