<p align="center"><img alt="Directus Logo" src="https://raw.githubusercontent.com/nawafinity/directus-extension-zeptomail/main/assets/cover.png"></p>

---

# 🐰 Introduction

A custom [Directus](https://directus.io) extension that integrates **ZeptoMail's HTTP API** to send
transactional emails.

<div align="center">

[العربية](README.ar_SA.md)

</div>

## 📚 **Table Of Contents**

<!-- TOC -->
* [🐰 Introduction](#-introduction)
  * [📚 **Table Of Contents**](#-table-of-contents)
  * [**Why This Extension?**](#why-this-extension)
  * [**✨ Features**](#-features)
  * [📦 **Installation**](#-installation)
    * [**Option 1**: 🛒 Directus ExtensionMarketplace (Recommended)](#option-1--directus-extensionmarketplace-recommended)
    * [**Option 2**: 📦 Manual Installation via NPM](#option-2--manual-installation-via-npm)
      * [Using NPM](#using-npm)
      * [Using PNPM](#using-pnpm)
      * [Using YARN](#using-yarn)
  * [⚙️ **Setup**](#-setup)
  * [⚠️ **Limitations**](#-limitations)
  * [🛠️ Contributing](#-contributing)
  * [🐞 Issues](#-issues)
  * [📄 License](#-license)
  * [❤️ Sponsoring](#-sponsoring)
<!-- TOC -->

## **Why This Extension?**

While setting up email functionality for a Directus-powered project, I encountered a limitation with my hosting
environment on **DigitalOcean**, which **does not support outbound SMTP connections** by default. This restriction made
it impossible to use traditional email plugins or SMTP-based providers.

To overcome this, I developed this extension to use **ZeptoMail's HTTP API**—a secure and reliable alternative to
SMTP—for sending transactional emails. This solution allows Directus to send emails without relying on SMTP, making it
ideal for environments where SMTP is blocked or restricted.

## **✨ Features**

- Sends transactional emails using ZeptoMail's HTTP API.
- Fully configurable via Module.
- Can be triggered on any Directus lifecycle hook (e.g. user creation, login, password reset).
- No SMTP dependency.

## 📦 **Installation**

You can install the extension in one of two ways:

### **Option 1**: 🛒 Directus ExtensionMarketplace (Recommended)

1. Open your Directus Admin Panel.
2. Go to **Settings → Extensions**
3. Click "Marketplace"
4. Search for **ZeptoMail**
5. Click install.

### **Option 2**: 📦 Manual Installation via NPM

#### Using NPM

```shell
npm install directus-extension-zeptomail
```

#### Using PNPM

```shell
pnpm add directus-extension-zeptomail
```

#### Using YARN

```shell
yarn add directus-extension-zeptomail
```

> 📘 Also take a look at the [Directus Guide](https://directus.io/docs/self-hosting/including-extensions) for more
> information on how to include and manage custom extensions in your Directus instance.

## ⚙️ **Setup**

After installing the extension, you'll need to configure by doing the following.

1. Open your **Directus Admin Panel**.
2. Navigate to **Settings → Modules**.
3. Enable the **ZeptoMail Settings** module.
4. From the main navigation menu, click on **ZeptoMail Settings**.
5. Fill out the configuration form as described below:

| Field                | Description                                                                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API Token**        | Your ZeptoMail API token (available in your ZeptoMail console).                                                                                            |
| **From Address**     | A verified sender email address (must be verified in your ZeptoMail account).                                                                              |
| **Name**             | *(Optional)* The sender name that will appear in the recipient's inbox.                                                                                    |
| **Track Clicks**     | *(Optional)* Enable or disable [click tracking](https://www.zoho.com/zeptomail/help/api/email-sending.html).                                               |
| **Track Opens**      | *(Optional)* Enable or disable [open tracking](https://www.zoho.com/zeptomail/help/api/email-sending.html).                                                |
| **Client Reference** | *(Optional)* A custom identifier for tracking individual transactions. See [client_reference](https://www.zoho.com/zeptomail/help/api/email-sending.html). |

> ⚠️ Make sure your **From Address** is verified in ZeptoMail to avoid delivery issues.

## ⚠️ **Limitations**

- **Attachments** are currently not supported due to Directus limitations.
  See [#22223](https://github.com/directus/directus/discussions/22223) for more details.
- **Batch sending** is not supported for the same reason; however, the `to` field already accepts an array of recipients
  by default.
- **ZeptoMail Template API** is not supported, as Directus handles email templates natively within its system.

## 🛠️ Contributing

Contributions are welcome! If you’d like to add new features, fix bugs, or improve the extension, feel free to submit a
pull request. For major changes, please open an issue first to discuss what you’d like to do.

1. Fork the repository
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request

## 🐞 Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/nawafinity/directus-extension-zeptomail/issues)
on GitHub with a clear description and steps to reproduce (if applicable). Your feedback helps improve the extension!

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.


## ❤️ Sponsoring

If you want to support our projects and help us group it, you can [become a sponsor on GitHub](https://github.com/sponsors/nawafinity) or just donate on [Buy Me Coffee](https://buymeacoffee.com/nawafinity).

---

<img height="56.5" src="https://raw.githubusercontent.com/nawafinity/directus-extension-zeptomail/main/assets/saudi-made.png" title="Made with ❤️ in Saudi Arabia" width="169" alt="Saudi made"/>

Made with 💚 in [Saudi Arabia](https://en.wikipedia.org/wiki/Saudi_Arabia)