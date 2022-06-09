import PageTitle from "../../../../components/PageTitle";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";

const AddBatteryPage = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });

    return (
        <>
            <PageTitle>{t("add_battery.header")}</PageTitle>
        </>
    );
};

export default AddBatteryPage;
