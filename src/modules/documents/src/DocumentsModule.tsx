import PageTitle from "../../../components/PageTitle";
import useScript from "../../../hooks/useScript";
import useTranslation from "../../../hooks/useTranslation";
import DocumentsModuleConfig from "../DocumentsModule";
import DocumentScanner from "./scan/DocumentScanner";

const DocumentsModule = () => {
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "main" });

    return (
        <>
            <PageTitle>{t("header")}</PageTitle>
            <DocumentScanner />
        </>
    );
};

export default DocumentsModule;
