import { faBatteryFull, faHome } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";
import ModuleInterface from "../ModuleInterface";
import DocumentsModule from "./src/DocumentsModule";
const MODULE_CONFIGURATION = {
    module_name: "Documents Modules",
    module_route: "/documents",
    module_subroutes: {},
    module_is_external: false,
    module_translation_prefix: "modules.documents.",
    module_permission: "", //"MODULE_DOCUMENTS",
};

const DocumentRouter = [<Route path={MODULE_CONFIGURATION.module_route} key={MODULE_CONFIGURATION.module_permission + "_1"} element={<DocumentsModule />}></Route>];

const DocumentsModuleConfig: ModuleInterface = {
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
    ],
    module_routes: DocumentRouter,
    module_translation_prefix: MODULE_CONFIGURATION.module_translation_prefix,
};

export default DocumentsModuleConfig;
