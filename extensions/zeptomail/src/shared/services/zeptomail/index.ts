import {Liquid} from "liquidjs";
import path from "path";
import {fileURLToPath} from "url";
import {Url} from "../../utils/url";
import fse from 'fs-extra';
import {InvalidPayloadError} from "@directus/errors";
import {COLLECTION_NAME, ZEPTMAIL_API} from "../../constants";

const __filename = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

export class ZeptoMailService {
    // Liquid
    engine: Liquid

    // Knex
    database: any

    // Directus env
    env: any

    // Logger [pino]
    logger: any


    constructor(database: any, env: any, logger: any) {
        this.database = database;
        this.logger = logger
        this.env = env

        this.engine = this.getLiquidEngine()
    }

    public async send(payload: any) {
        this.logger.info("Sending via zeptomail service...");
        const settings = await this.getZeptoMailSettings();
        const defaultTemplateData = await this.getDefaultTemplateData()

        const {template, ...emailOptions} = payload
        let {html} = emailOptions


        const from = {
            name: defaultTemplateData.projectName,
            address: settings?.from_address || this.env['EMAIL_FROM'] as string
        }

        let receivers = this.normalizeRecipients(payload.to)
        let cc = this.normalizeRecipients(payload.cc)
        let bcc = this.normalizeRecipients(payload.bcc)
        let replay_to = this.normalizeRecipients(payload.replay_to)

        if (template) {
            let templateData = template.data

            templateData = {
                ...defaultTemplateData,
                templateData
            }

            html = await this.renderTemplate(template.name, templateData)
        }

        if (typeof html === 'string') {
            html = html
                .split('\n')
                .map((line) => line.trim())
                .join('\n');
        }


        let requestBody: any = {
            from,
            to: receivers,
            htmlbody: html,
            textbody: payload.text || (html ? html.replace(/<\/?[^>]+(>|$)/g, "") : ""),
            subject: emailOptions?.subject || 'Untitled',
            track_clicks: settings?.track_clicks || false,
            track_opens: settings?.track_opens || false,
            client_reference: settings?.client_reference || false,
        }

        if (cc.length) {
            requestBody.cc = cc
        }

        if (bcc.length) {
            requestBody.bcc = bcc
        }

        if (replay_to.length) {
            requestBody.replay_to = replay_to
        }

        try {
            const feedback = await fetch(ZEPTMAIL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': settings?.api_token
                },
                body: JSON.stringify(requestBody)
            })

            const data = await feedback.json()
            if (data.error) {
                this.logger.error(`[ZeptoMail][${data.error.code}]: ${data.error.message}`)
            }
            if (data) {
                this.logger.info(`[ZeptoMail][${data.data[0].code}]: ${data.data[0].message}`)
            }
        } catch (err) {
            this.logger.error(`[ZeptoMail]: ${(err as any).message}`)
        }
    }

    /**
     * @see https://github.com/directus/directus/blob/7ce79a53644162c35972dd4a5bc25f3ca5e57df3/api/src/services/mail/index.ts#L22
     * @private
     */
    private getLiquidEngine() {
        return new Liquid({
            root: [path.resolve(this.env['EMAIL_TEMPLATES_PATH']), path.resolve(__dirname, 'templates')],
            extname: '.liquid'
        })
    }

    /**
     *
     * @param template
     * @param variables
     * @private
     */
    private async renderTemplate(template: string, variables: Record<string, any>) {
        const customTemplatePath = path.resolve(this.env['EMAIL_TEMPLATES_PATH'] as string, template + '.liquid');
        const systemTemplatePath = path.join(__dirname, 'templates', template + '.liquid');

        const templatePath = (await fse.pathExists(customTemplatePath)) ? customTemplatePath : systemTemplatePath;
        if (!(await fse.pathExists(templatePath))) {
            throw new InvalidPayloadError({reason: `Template "${template}" doesn't exist`});
        }

        const templateString = await fse.readFile(templatePath, 'utf8');
        const html = await this.engine.parseAndRender(templateString, variables);

        return html;
    }

    /**
     *
     * @private
     */
    private async getProjectInfo() {
        return this.database
            .select(['project_name', 'project_logo', 'project_color', 'project_url'])
            .from('directus_settings')
            .first();
    }

    /**
     *
     * @param logoID
     * @private
     */
    private getProjectLogoURL(logoID?: string) {
        const projectLogoUrl = new Url(this.env['PUBLIC_URL'] as string)

        if (logoID) {
            projectLogoUrl.addPath('assets', logoID);
        } else {
            projectLogoUrl.addPath('admin', 'img', 'directus-white.png');
        }

        return projectLogoUrl.toString();
    }

    /**
     *
     * @private
     */
    private async getDefaultTemplateData() {
        const projectInfo = await this.getProjectInfo();

        return {
            projectName: projectInfo?.project_name || 'Directus',
            projectColor: projectInfo?.project_color || '#171717',
            projectLogo: this.getProjectLogoURL(projectInfo?.project_logo),
            projectUrl: projectInfo?.project_url || ''
        }
    }

    private async getZeptoMailSettings() {
        return this.database
            .select(['api_token', 'from_address', 'track_clicks', 'track_opens', 'client_reference'])
            .from(COLLECTION_NAME)
            .first();
    }

    private normalizeRecipients(value: string | string[]) {
        if (!value) return [];

        let recipients: any[];
        if (Array.isArray(value)) {
            recipients = value.map(v => {
                return {
                    email_address: {address: v}
                }
            })
        } else {
            recipients = [{email_address: {address: value}}];
        }

        return recipients;
    }
}