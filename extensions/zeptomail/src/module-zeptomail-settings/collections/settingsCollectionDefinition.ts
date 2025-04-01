export const settingsCollectionDefinition = {
    "collection": "zeptomail_settings",
    "fields": [
        {
            "type": "alias",
            "meta": {
                "interface": "presentation-notice",
                "special": [
                    "alias",
                    "no-data"
                ],
                "options": {
                    "text": "Please <a href=\"\">AAA</a>",
                    "icon": "info",
                    "color": "info"
                }
            },
            "field": "notice-mrkuiu"
        },
        {
            "field": "id",
            "type": "uuid",
            "meta": {
                "hidden": true,
                "readonly": true,
                "interface": "input",
                "special": [
                    "uuid"
                ]
            },
            "schema": {
                "is_primary_key": true,
                "length": 36,
                "has_auto_increment": false
            }
        },
        {
            "type": "string",
            "meta": {
                "interface": "input",
                "special": null,
                "options": {
                    "placeholder": "API Token",
                    "iconLeft": "lock"
                },
                "required": true,
                width: 'half'
            },
            "field": "api_token"
        },
        {
            "type": "string",
            "meta": {
                "interface": "input",
                "special": null,
                "options": {
                    "iconLeft": "alternate_email",
                    "placeholder": "From Email"
                },
                required: true,
                width: 'half'
            },
            "field": "from_email"
        }
    ],
    "schema": {},
    "meta": {
        "singleton": true,
        hidden: true,
    }
}