import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";
import { BatteryInterface } from "../src/BatteryTypes";

export class BatteryAddToDatabaseQuery extends UserAuthenticatedRequest<BatteryAddToDatabaseQueryQueryParams, BatteryAddToDatabaseQueryQueryResults> {
    constructor() {
        super("POST", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.add_to_database);
    }
}

interface BatteryAddToDatabaseQueryQueryParams extends Array<BatteryInterface> {}

interface BatteryAddToDatabaseQueryQueryResults {
    already_in_database: BatteryInterface[];
}
