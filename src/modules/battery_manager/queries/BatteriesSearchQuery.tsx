import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";
import { BatteryInterface } from "../src/BatteryTypes";

export class BatteriesSearchQuery extends UserAuthenticatedRequest<BatteriesSearchQueryParams, BatteriesSearchQueryResults> {
    constructor() {
        super("GET", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.search_route);
    }
}

interface BatteriesSearchQueryParams {
    batteryId?: number;
    dischargeRate?: number;
    min_initial_voltage?: number;
    max_initial_voltage?: number;
    min_capacity?: number;
    max_capacity?: number;
    from?: string;
    batteryType?: string;
    inUse?: boolean;
    page?: number;
}

interface BatteriesSearchQueryResults {
    batteries_found: BatteryInterface[];
}
