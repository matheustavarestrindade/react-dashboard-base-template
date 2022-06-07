import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";
import ModuleInterface from "../ModuleInterface";
import BatteryManager from "./src/Main";

const MODULE_CONFIGURATION = {
    module_name: "Battery Manager",
    module_route: "/battery_manager",
    module_is_external: false,
};

const BatteryManagerRouter = (
    <>
        <Route path={MODULE_CONFIGURATION.module_route + "/"} element={<BatteryManager />}></Route>
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
    module_navigation: [],
    module_routes: BatteryManagerRouter,
};

export default BatteryManagerModule;
