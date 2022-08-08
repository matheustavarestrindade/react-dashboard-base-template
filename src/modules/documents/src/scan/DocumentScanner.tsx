import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useEffect } from "react";
import PageTitle from "../../../../components/PageTitle";
import useScript from "../../../../hooks/useScript";
import useTranslation from "../../../../hooks/useTranslation";
import DocumentsModuleConfig from "../../DocumentsModule";

const DocumentScanner = () => {
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "scanner" });
    const [loading, error] = useScript({ src: "https://docs.opencv.org/4.6.0/opencv.js", checkForExisting: true });

    const handleScriptLoading = useCallback(() => {
        if (loading)
            showNotification({
                id: "open-cv-script-loading",
                title: t("script_loading_title"),
                message: t("script_loading_message"),
                autoClose: false,
            });
        else if (!error && !loading)
            updateNotification({
                id: "open-cv-script-loading",
                title: t("script_loaded_title"),
                message: t("script_loaded_message"),
                color: "green",
                icon: <FontAwesomeIcon icon={faCheck} />,
                autoClose: true,
            });
        else
            updateNotification({
                id: "open-cv-script-loading",
                title: t("script_loading_error_title"),
                message: t("script_loading_error_message"),
                color: "red",
                icon: <FontAwesomeIcon icon={faTimes} />,
                autoClose: true,
            });
    }, [error, loading, t]);

    useEffect(handleScriptLoading, [handleScriptLoading, loading]);

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    return (
        <>
            <PageTitle>{t("header")}</PageTitle>
        </>
    );
};

export default DocumentScanner;
