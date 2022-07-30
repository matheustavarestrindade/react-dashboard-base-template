import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";
import ModuleInterface from "../ModuleInterface";
import MinerSystemRedirect from "./src/MinerSystemRedirect";

const MODULE_CONFIGURATION = {
    module_name: "Miner System",
    module_route: "/miner_system",
    module_external_url: "http://192.168.0.76/",
    module_subroutes: {},
    module_is_external: true,
    module_translation_prefix: "modules.miner_system.",
    module_permission: "MODULE_MINER_SYSTEM",
};

const MinerSystemRouter = [<Route path={MODULE_CONFIGURATION.module_route} element={<MinerSystemRedirect />} />];

const MinerSystemModule: ModuleInterface = {
    module_name: MODULE_CONFIGURATION.module_name,
    module_route: MODULE_CONFIGURATION.module_route,
    module_permission: MODULE_CONFIGURATION.module_permission,
    module_is_external: MODULE_CONFIGURATION.module_is_external,
    module_external_url: MODULE_CONFIGURATION.module_external_url,
    module_icon: {
        icon: faCoins,
        to: MODULE_CONFIGURATION.module_route,
        description: "Miner System",
    },
    module_navigation: [],
    module_routes: MinerSystemRouter,
    module_translation_prefix: MODULE_CONFIGURATION.module_translation_prefix,
};

export default MinerSystemModule;
