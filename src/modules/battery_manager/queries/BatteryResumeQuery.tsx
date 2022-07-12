import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";

export class BatteryResumeQuery extends UserAuthenticatedRequest<BatteryResumeQueryResults, BatteryQueryParams> {
    constructor() {
        super("GET", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.battery_resume);
    }
}

interface BatteryQueryParams {}

export interface BatteryResumeQueryResults {
    total_batteries_free_to_use: number;
    batteries_capacity_mah_used: number;
    batteries_capacity_mah_total: number;
    batteries_capacity_mah_unused: number;
    total_batteries_used: number;
    total_batteries: number;
}
