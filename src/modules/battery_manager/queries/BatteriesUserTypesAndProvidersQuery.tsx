import { UserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import configuration from "../../../ProjectConfiguration";

export class BatteriesUserTypesAndProvidersQuery extends UserAuthenticatedRequest<BatteriesUserTypesAndProvidersQueryResults, BatteriesUserTypesAndProvidersQueryParams> {
    constructor() {
        super("GET", configuration.api.base_url + configuration.api.battery_management.base_url + configuration.api.battery_management.battery_types_and_porviders);
    }
}

interface BatteriesUserTypesAndProvidersQueryParams {}

interface BatteriesUserTypesAndProvidersQueryResults {
    [key: string]: string;
}
