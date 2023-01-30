import INotification from "./interfaceTs";
import axios from 'axios';


class NotificationMethod implements INotification {
    constructor() {
    }
    async getData(input) {
        try {
            const data = await axios.get<any>(
                input.url
            );
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.message;
            } else {
                return 'An unexpected error occurred';
            }
        }
    }
    async markNotificationAsRead(input) {
        try {
            const data = await axios.patch<any>(
                input.url,
                input.payload.body
            );

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.message;
            } else {
                return 'An unexpected error occurred';
            }
        }
    }
    async getFilterData(input) {
        return input;
    }
    async handleCustomEvent(input) {
        return input;
    }
}
export default NotificationMethod;
