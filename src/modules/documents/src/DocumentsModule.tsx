import PageTitle from "../../../components/PageTitle";
import useTranslation from "../../../hooks/useTranslation";
import DocumentsModuleConfig from "../DocumentsModule";

const DocumentsModule = () => {
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "main" });

    return (
        <>
            <PageTitle>{t("header")}</PageTitle>
        </>
    );
};

export default DocumentsModule;
