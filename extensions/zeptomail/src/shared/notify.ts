/**
 * @see https://docs.directus.io/packages/@directus/stores/
 */
import {useStores} from "@directus/composables";

export function notify(notification: any): void {
    const stores = useStores()
    console.log(stores)
}