import { faBatteryFull, faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";
import ModuleInterface from "../ModuleInterface";
import AddBatteryPage from "./src/add_battery/AddBatteryPage";
import BatteryManager from "./src/Main";

const MODULE_CONFIGURATION = {
    module_name: "Battery Manager",
    module_route: "/battery_manager",
    module_subroutes: {
        add_battery: "/add_battery",
    },
    module_is_external: false,
    module_translation_prefix: "modules.battery_manager.",
    module_permission: "MODULE_BATTERY_MANAGEMENT",
};

const BatteryManagerRouter = [
    <Route path={MODULE_CONFIGURATION.module_route} key={MODULE_CONFIGURATION.module_permission + "_1"} element={<BatteryManager />}></Route>,
    <Route path={MODULE_CONFIGURATION.module_route + MODULE_CONFIGURATION.module_subroutes.add_battery} key={MODULE_CONFIGURATION.module_permission + "_2"} element={<AddBatteryPage />}></Route>,
];

const BatteryManagerModule: ModuleInterface = {
    module_name: MODULE_CONFIGURATION.module_name,
    module_route: MODULE_CONFIGURATION.module_route,
    module_permission: MODULE_CONFIGURATION.module_permission,
    module_is_external: false,
    module_icon: {
        icon: faBatteryFull,
        to: MODULE_CONFIGURATION.module_route,
        description: "Battery Manager",
    },
    module_navigation: [
        {
            icon: faHome,
            to: MODULE_CONFIGURATION.module_route,
        },
        {
            icon: faPlus,
            to: MODULE_CONFIGURATION.module_route + MODULE_CONFIGURATION.module_subroutes.add_battery,
        },
    ],
    module_routes: BatteryManagerRouter,
    module_translation_prefix: MODULE_CONFIGURATION.module_translation_prefix,
};

export default BatteryManagerModule;
