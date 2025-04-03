import {defineHook} from '@directus/extensions-sdk';
import {ZeptoMailService} from "../shared/services";

export default defineHook(({filter}, {env, logger}) => {
    filter<any>('email.send', async (payload, _, context) => {
        const {database} = context;
        const zeptomail = new ZeptoMailService(database, env, logger)

        // Send email
        await zeptomail.send(payload);

        // To prevent use SMTP, or any other provider
        // @see https://github.com/directus/directus/blob/7ce79a53644162c35972dd4a5bc25f3ca5e57df3/api/src/services/mail/index.ts#L59
        return null
    });

});
