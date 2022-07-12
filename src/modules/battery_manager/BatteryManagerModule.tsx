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
};

const BatteryManagerRouter = (
    <>
        <Route path={MODULE_CONFIGURATION.module_route} element={<BatteryManager />}></Route>
        <Route path={MODULE_CONFIGURATION.module_route + MODULE_CONFIGURATION.module_subroutes.add_battery} element={<AddBatteryPage />}></Route>
    </>
);

const BatteryManagerModule: ModuleInterface = {
    module_name: MODULE_CONFIGURATION.module_name,
    module_route: MODULE_CONFIGURATION.module_route,
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
