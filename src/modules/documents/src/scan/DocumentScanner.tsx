import { faCamera, faCheck, faPlusCircle, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../../../../components/PageTitle";
import useScript from "../../../../hooks/useScript";
import useTranslation from "../../../../hooks/useTranslation";
import DocumentsModuleConfig from "../../DocumentsModule";
import { Button, Card, Col, Grid, Loader, LoadingOverlay, Modal, Text } from "@mantine/core";
import OpenCVScanner from "./OpenCVScanner";
import ScannedResults from "./ScannedResults";
import IScannedImage, { IScannedDocument } from "./IScannedImage";
import useUUID from "../../../../hooks/useUUID";
import { Dropzone } from "@mantine/dropzone";
const DocumentScanner = () => {
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "scanner" });
    const [loading, error] = useScript({ src: "https://docs.opencv.org/4.6.0/opencv.js", checkForExisting: true });
    const [scanning, setScanning] = useState<boolean>(false);
    const [scannedDocuments, setScannedDocuments] = useState<IScannedDocument[]>([]);
    const { generateUUID } = useUUID();
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

    const deleteDocumentFile = useCallback(
        (document_UUID: string, file_uuid: string) => {
            console.log("deleteDocumentFile", document_UUID, file_uuid);
            const documents = [...scannedDocuments];
            const document = documents.find((document) => document.uuid === document_UUID);
            if (document) {
                const newFiles = document.scanned_images.filter((file) => file.uuid !== file_uuid);
                document.scanned_images = newFiles;
                if (document.scanned_images.length === 0) {
                    documents.splice(documents.indexOf(document), 1);
                }
            }
            setScannedDocuments(documents);
        },
        [scannedDocuments]
    );

    console.log(scannedDocuments);

    return (
        <>
            <PageTitle>
                <Grid p={0} gutter={0} grow justify={"space-between"}>
                    <Col span={4}>{t("header")}</Col>
                    <Col span={4} style={{ display: "flex", alignItems: "flex-end", justifyContent: "end" }}>
                        <Button
                            color={"green.9"}
                            onClick={() => {
                                if (loading) return;
                                setScanning(true);
                            }}
                            style={{ marginRight: "0.5rem" }}
                        >
                            {loading && <Loader color={"white"} size={"sm"} style={{ marginRight: "0.5rem" }} />}
                            {loading && t("scan_card.loading_scanner")}
                            {!loading && <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "0.5rem" }} />}
                            {!loading && t("scan_card.scan_now")}
                        </Button>
                        <Dropzone style={{ fontSize: "14px", whiteSpace: "nowrap" }} padding={6} onDrop={(file) => console.log(file)} color={"green.9"}>
                            {loading && <Loader color={"white"} size={"sm"} style={{ marginRight: "0.5rem" }} />}
                            {loading && t("scan_card.loading_scanner")}
                            {!loading && <FontAwesomeIcon icon={faUpload} style={{ marginRight: "0.5rem" }} />}
                            {!loading && t("scan_card.upload_now")}
                        </Dropzone>
                    </Col>
                </Grid>
            </PageTitle>
            <Modal fullScreen opened={scanning} onClose={() => setScanning(false)} style={{ background: "transparent" }}>
                {!loading && scanning && (
                    <OpenCVScanner
                        closeModal={() => setScanning(false)}
                        onFinishScan={(scannedImages: IScannedImage[]) => {
                            if (scannedImages && scannedImages.length > 0)
                                setScannedDocuments((scannedDocuments) => [
                                    ...scannedDocuments,
                                    { scanned_images: scannedImages, title: "Edit Document Title", description: "", category: "", uuid: generateUUID() },
                                ]);
                        }}
                    />
                )}
            </Modal>
            {(scannedDocuments.length > 0 && (
                <Card>
                    <Text weight={500}>{t("scan_results.scans")}</Text>
                    {scannedDocuments.length > 0 && scannedDocuments.map((document, id) => <ScannedResults key={id} document={document} deleteDocumentFile={deleteDocumentFile} />)}
                </Card>
            )) || <></>}
        </>
    );
};

export default DocumentScanner;
