Great! Your section looks clear and informative. Here's a slightly refined version for consistency, clarity, and formatting. I've polished the wording, fixed the double "**Settings → Settings → Modules**", and added minor improvements for readability:

---

## ⚙️ **Setup**

After installing the extension, follow these steps to configure it:

### 1. Enable the ZeptoMail Settings Module

1. Open your **Directus Admin Panel**.
2. Navigate to **Settings → Modules**.
3. Enable the **ZeptoMail Settings** module.
4. From the main navigation menu, click on **ZeptoMail Settings**.
5. Fill out the configuration form as described below:

| Field               | Description                                                                                                                                              |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API Token**        | Your ZeptoMail API token (available in your ZeptoMail console).                                                                                          |
| **From Address**     | A verified sender email address (must be verified in your ZeptoMail account).                                                                           |
| **Name**             | *(Optional)* The sender name that will appear in the recipient's inbox.                                                                                 |
| **Track Clicks**     | *(Optional)* Enable or disable [click tracking](https://www.zoho.com/zeptomail/help/api/email-sending.html).                                            |
| **Track Opens**      | *(Optional)* Enable or disable [open tracking](https://www.zoho.com/zeptomail/help/api/email-sending.html).                                             |
| **Click Reference**  | *(Optional)* A custom identifier for tracking individual transactions. See [click_reference](https://www.zoho.com/zeptomail/help/api/email-sending.html). |

> ⚠️ Make sure your **From Address** is verified in ZeptoMail to avoid delivery issues.

### 2. Restart Directus

Once the configuration is saved, restart your Directus instance to apply the changes:

```bash
npx directus start
```

---

Let me know if you'd like to continue with the full final README, add visual examples, or explain how to trigger emails from hooks!