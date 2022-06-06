import { ReactNode } from "react";
import { NavigationItem } from "../context/PageNavigationProvider";
export default interface ModuleInterface {
    module_name: string;
    module_route: string;
    module_is_external: boolean;

    module_icon: NavigationItem;
    module_navigation: NavigationItem[];

    module_routes: ReactNode;
}
