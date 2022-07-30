import { NavigationItem } from "../context/PageNavigationProvider";
export default interface ModuleInterface {
    module_name: string;
    module_permission: string;

    module_route: string;
    module_is_external: boolean;
    module_external_url?: string;

    module_icon: NavigationItem;
    module_navigation: NavigationItem[];

    module_routes: React.ReactElement[];
    module_translation_prefix: string;
}
