import { faCamera, faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Group, Text, ThemeIcon } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import QrScanner from "qr-scanner";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryExistsOnDatabaseQuery } from "../../queries/BatteryExistsOnDatabaseQuery";
import BatteryInterface from "../BatteryInterface";

interface QRCodeScannerInterface {
    addScannedBattery: (battery: BatteryInterface) => void;
}

const QRCodeScanner = ({ addScannedBattery }: QRCodeScannerInterface) => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const videoDisplayRef = useRef<HTMLVideoElement | null>(null);
    const [hasWebcam, setHasWebcam] = useState<boolean>(false);
    const qrScannerRef = useRef<QrScanner | null>(null);
    const [scannedBatteriesIds, setScannedBatteriesIds] = useState<number[]>([]);
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();

    const handleScannedBattery = useCallback(
        async (battery: BatteryInterface) => {
            if (battery.batteryId == null || battery.batteryId === undefined) return;
            const battery_id: number = battery.batteryId;
            if (scannedBatteriesIds.includes(battery_id)) return;
            const notification_id = "adding-battery" + Date.now();

            showNotification({
                id: notification_id,
                loading: true,
                color: "blue",
                message: "Checking battery on database...",
            });

            setScannedBatteriesIds((s) => {
                s.push(battery_id);
                return s;
            });

            const request = new BatteryExistsOnDatabaseQuery();
            request.setRequestBody({ batteryId: battery.batteryId });
            const result = await executeAuthenticatedRequest(request);

            if (result.hasError()) {
                updateNotification({
                    id: notification_id,
                    color: "red",
                    autoClose: 5000,
                    icon: <FontAwesomeIcon icon={faExclamation} />,
                    message: "Unable to comunicate with the backend!",
                });
                return;
            }

            const isInDatabase = result.getResult().in_database;

            if (isInDatabase) {
                updateNotification({
                    id: notification_id,
                    color: "yellow",
                    autoClose: 5000,
                    icon: <FontAwesomeIcon icon={faExclamation} />,
                    message: "This battery is already on the database!",
                });
                return;
            }

            updateNotification({
                id: notification_id,
                color: "green",
                autoClose: 5000,
                icon: <FontAwesomeIcon icon={faCheck} />,
                message: "Battery has been added to upload list!",
            });

            addScannedBattery(battery);
        },
        [addScannedBattery, executeAuthenticatedRequest, scannedBatteriesIds]
    );

    const qrCodeHandler = useCallback(
        async (scannedQR: QrScanner.ScanResult) => {
            const qrData = scannedQR.data;
            const splittedQRValues = qrData.includes(";") ? qrData.split(";") : isNumber(qrData) ? [qrData] : null;
            if (splittedQRValues == null) return;
            const batteryInformation: BatteryInterface = {
                inUse: false,
                batteryId: -1,
                batteryType: "LITHIUM_ION_18650",
                initialVoltage: 0.0,
                dischargeRate: 0.5,
                capacitymAh: 0,
                from: "",
            };
            if (splittedQRValues.length === 1) {
                //Old code, has just the bat id
                batteryInformation.batteryId = Number(splittedQRValues[0]);
                handleScannedBattery(batteryInformation);
                return;
            }
            console.log(splittedQRValues);
            for (const batInfoString of splittedQRValues) {
                const splittedInfo = batInfoString.split("=");
                if (splittedInfo.length !== 2) {
                    continue;
                }
                switch (splittedInfo[0]) {
                    case "bat_id":
                        batteryInformation.batteryId = Number(splittedInfo[1]);
                        break;
                    case "capacity":
                        batteryInformation.capacitymAh = Number(splittedInfo[1]);
                        break;
                    case "discharge_rate":
                        batteryInformation.dischargeRate = Number(splittedInfo[1]);
                        break;
                    case "from":
                        batteryInformation.from = splittedInfo[1];
                        break;
                    case "initial_voltage":
                        batteryInformation.initialVoltage = Number(splittedInfo[1]);
                        break;
                    case "battery_type":
                        batteryInformation.batteryType = splittedInfo[1];
                        break;
                }
            }
            handleScannedBattery(batteryInformation);
        },
        [handleScannedBattery]
    );

    const loadQRScanner = useCallback(async () => {
        try {
            const hasWebcam = await QrScanner.hasCamera();
            setHasWebcam(hasWebcam);
            if (!hasWebcam) return;
            if (qrScannerRef.current != null) {
                qrScannerRef.current.stop();
            }
            if (videoDisplayRef.current === null) {
                return;
            }
            qrScannerRef.current = new QrScanner(videoDisplayRef.current, qrCodeHandler, { highlightScanRegion: true, highlightCodeOutline: true });
            await qrScannerRef.current.start();
        } catch (err) {
            setHasWebcam(false);
            console.log(err);
        }
    }, [qrCodeHandler]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            loadQRScanner();
        }, 1000);
        return () => {
            if (qrScannerRef.current) qrScannerRef.current.stop();
            clearTimeout(timeout);
        };
    }, [loadQRScanner]);

    return (
        <Grid.Col sm={12} md={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <video ref={videoDisplayRef} style={{ display: hasWebcam ? "block" : "none", maxWidth: 300 }}></video>
            {!hasWebcam && (
                <Group position="center">
                    <ThemeIcon>
                        <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                    </ThemeIcon>
                    <Text align="center">{t("add_battery.scan_card.no_camera")}</Text>
                </Group>
            )}
        </Grid.Col>
    );
};

function isNumber(value: string | number): boolean {
    return value != null && value !== "" && !isNaN(Number(value.toString()));
}

export default QRCodeScanner;
