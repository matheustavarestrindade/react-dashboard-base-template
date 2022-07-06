import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";
import BatteryInterface from "../src/BatteryInterface";

export class BatteryExistsOnDatabaseQuery extends UserAuthenticatedRequest<BatteryExistsOnDatabaseQueryParams, BatteryExistsOnDatabaseQueryResults> {
    constructor() {
        super("GET", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.exists_route);
    }
}

interface BatteryExistsOnDatabaseQueryParams {
    batteryId: number;
}

interface BatteryExistsOnDatabaseQueryResults {
    in_database: boolean;
}
