export function resolveLocale(locale: string) {
    if (locale) {
        let _locale = locale
        if (_locale.includes('-')) {
            const localeComponents = _locale.split('-')
            return (localeComponents[0] || 'en').toLowerCase()
        } else {
            return locale
        }
    }

    return 'en'
}