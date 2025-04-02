import {defineHook} from '@directus/extensions-sdk';
import path from "path";
import {fileURLToPath} from "url";
import {getEngine} from "../shared/utils/liquid";

console.log(import.meta.url)

const __filename = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

export default defineHook(({filter}, {env, logger}) => {
    filter<any>('email.send', async (payload, _, context) => {
        const { database } = context;
        const engine = getEngine([path.resolve(env['EMAIL_TEMPLATES_PATH']), path.resolve(__dirname, 'templates')])

        const {template, ...emailOptions} = payload;
        let {html} = payload


        async function getZeptoMailSettings() {
            return database
                .select(['api_token', 'from_address', 'track_clicks', 'track_opens', 'click_reference'])
                .from('zeptomail_settings')
                .first();
        }

        const settings = await getZeptoMailSettings()

        
        // To prevent use SMTP, or any other provider
        // @see https://github.com/directus/directus/blob/7ce79a53644162c35972dd4a5bc25f3ca5e57df3/api/src/services/mail/index.ts#L59
        return null
    });

});
