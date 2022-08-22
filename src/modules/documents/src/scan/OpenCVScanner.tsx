import { useCallback, useEffect, useRef, useState } from "react";
import { detectVideo } from "document-scanner-opencv";
import { Point } from "document-scanner-opencv/lib/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, LoadingOverlay, ThemeIcon } from "@mantine/core";
import useTranslation from "../../../../hooks/useTranslation";
import DocumentsModuleConfig from "../../DocumentsModule";

import IScannedImage from "./IScannedImage";
import useUUID from "../../../../hooks/useUUID";
declare const cv: any | undefined;

declare interface Props {
    closeModal: () => void;
    onScreenshot?: (scannedImage: IScannedImage) => void;
    onFinishScan?: (scannedImages: IScannedImage[]) => void;
}

const OpenCVScanner = ({ closeModal, onScreenshot, onFinishScan }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const resultRef = useRef<HTMLCanvasElement>(null);
    const stopRef = useRef<any>();
    const lastScanResult = useRef<{ points: Point[] }>();
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [scannCount, setScannCount] = useState(0);
    const [scannedImages, setScannedImages] = useState<IScannedImage[]>([]);
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "scanner.scanned_result" });
    const { generateUUID } = useUUID();

    const startVideo = useCallback(async () => {
        stopRef.current?.stop();
        if (!videoRef.current) return;
        if (!resultRef.current) return;
        console.log("startVideo");
        const { stop } = await detectVideo({
            videoDisplayElement: videoRef.current,
            resultElement: resultRef.current,
            onDetect: (points) => {
                lastScanResult.current = { points };
            },
            showContours: true,
            drawRectangle: true,
            contourColor: { r: 255, g: 255, b: 255 }, // color of the contours
        });
        stopRef.current = { stop };
        setLoading(false);
    }, []);

    const handleResize = useCallback(() => {
        if (stopRef.current) {
            const { stop } = stopRef.current;
            stop();
            stopRef.current = null;
        }
        setLoading(true);
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, []);

    const handleUmount = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
            videoRef.current.src = "";
        }
        if (stopRef.current?.stop) {
            stopRef.current.stop();
            console.log("stopped");
            stopRef.current = null;
        }
        setLoading(true);
    }, []);

    const handleFinishScan = useCallback(() => {
        if (onFinishScan) {
            onFinishScan([...scannedImages]);
            setScannedImages([]);
        }
        handleUmount();
        closeModal();
    }, [closeModal, onFinishScan, scannedImages, handleUmount]);

    const takeScreenshot = useCallback(() => {
        if (!lastScanResult.current) return;
        if (!videoRef.current) return;
        const { points } = JSON.parse(JSON.stringify(lastScanResult.current)); // Cloning the points as i dont need the reference
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        const image = canvas.toDataURL("image/png");
        setScannCount((c) => c + 1);
        setScannedImages((images) => [...images, { points, image, uuid: generateUUID() }]);
        if (!onScreenshot) return;
        onScreenshot({ points, image, uuid: generateUUID() });
    }, [generateUUID, onScreenshot]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!cv || !videoRef.current || !resultRef.current) {
                setLoading(true);
                return;
            }
            handleResize();
            window.addEventListener("resize", handleResize);
        }, 200);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize, startVideo]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            startVideo();
        }, 200);
        return () => clearTimeout(timeout);
    }, [width, height, startVideo]);

    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: width, height: height }}>
            <LoadingOverlay visible={loading} />
            <ThemeIcon
                style={{ cursor: "pointer", position: "absolute", top: 50, right: 50, zIndex: 10 }}
                onClick={() => {
                    handleUmount();
                    closeModal();
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </ThemeIcon>
            <ThemeIcon
                onClick={takeScreenshot}
                radius={"xl"}
                size={"xl"}
                style={{ cursor: "pointer", position: "absolute", bottom: 50, right: width / 2, transform: "translate(50%, 50%)", zIndex: 10 }}
            >
                <FontAwesomeIcon icon={faCamera} />
            </ThemeIcon>
            <Button
                onClick={handleFinishScan}
                radius={"xl"}
                size={"md"}
                color="green"
                style={{ cursor: "pointer", position: "absolute", bottom: 50, right: 100, transform: "translate(50%, 50%)", zIndex: 10 }}
            >
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: "1rem" }} />
                {t("finish_scan").replace("{count}", scannCount.toString())}
            </Button>
            <video style={{ opacity: 0, position: "absolute", pointerEvents: "none" }} autoPlay ref={videoRef} width={width} height={height}></video>
            <canvas style={{ position: "absolute", top: 0, left: 0 }} ref={resultRef} width={width} height={height}></canvas>
        </div>
    );
};

export default OpenCVScanner;
