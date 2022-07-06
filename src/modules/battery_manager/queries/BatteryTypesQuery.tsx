import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";

export class BatteryTypesQuery extends UserAuthenticatedRequest<BatteryQueryResults, BatteryQueryParams> {
    constructor() {
        super("GET", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.battery_types);
    }
}

interface BatteryQueryParams {}

interface BatteryQueryResults {
    [key: string]: string;
}
