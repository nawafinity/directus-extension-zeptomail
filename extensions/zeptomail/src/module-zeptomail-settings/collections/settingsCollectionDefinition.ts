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
                    "text": "Please take a look at the <a href=\"\"><b>ZeptoMail Documentation</b></a> for more information on how the API works and available options.",
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
                "note": "Your ZeptoMail API token.",
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
                    "placeholder": "From Address"
                },
                required: true,
                width: 'half'
            },
            "field": "from_address"
        },
        {
            "type": "boolean",
            "meta": {
                "interface": "boolean",
                "special": [
                    "cast-boolean"
                ]
            },
            "field": "track_clicks"
        },
        {
            "type": "boolean",
            "meta": {
                "interface": "boolean",
                "special": [
                    "cast-boolean"
                ]
            },
            "field": "track_opens"
        },
        {
            "type": "boolean",
            "meta": {
                "interface": "boolean",
                "special": [
                    "cast-boolean"
                ]
            },
            "field": "click_reference"
        }
    ],
    "schema": {},
    "meta": {
        "singleton": true,
        hidden: true,
    }
}