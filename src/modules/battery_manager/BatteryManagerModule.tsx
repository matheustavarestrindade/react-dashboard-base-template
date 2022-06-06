import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import ModuleInterface from "../ModuleInterface";

const BatteryManagerModule: ModuleInterface = {
    module_name: "",
    module_route: "battery_manager",
    module_is_external: false,
    module_icon: {
        icon: faBatteryFull,
        to: "battery_manager",
        description: "Battery Manager",
    },
    module_navigation: [],
    module_routes: undefined,
};

export default BatteryManagerModule;
