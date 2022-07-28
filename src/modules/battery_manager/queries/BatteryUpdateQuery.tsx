import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";

export class BatteryUpdateQuery extends UserAuthenticatedRequest<BatteryUpdateQueryParams, BatteryUpdateQueryResults> {
    constructor() {
        super("PATCH", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.update);
    }
}

interface BatteryUpdateQueryParams {
    batteryId: number;
    dischargeRate?: number;
    initial_voltage?: number;
    capacity?: number;
    from?: string;
    batteryType?: string;
    inUse?: boolean;
}

interface BatteryUpdateQueryResults {}
