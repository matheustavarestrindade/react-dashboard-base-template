import { Button, createStyles, Drawer, Group, Modal, Paper, ThemeIcon, Text, Grid, Col } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { PerspectiveCropper, Point } from "react-image-perspective-cropper";
import DocumentsModuleConfig from "../../DocumentsModule";
import useTranslation from "../../../../hooks/useTranslation";
import useImageConverter from "../../../../hooks/useImageConverter";

const useStyles = createStyles((theme) => ({
    card: {
        height: 440,
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "flex-end",
        backgroundSize: "fit",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minWidth: "200px",
        backgroundColor: "transparent",
    },
    canvas: {
        position: "absolute",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        backgroundSize: "cover",
        zIndex: -1,
        top: 0,
        left: 0,
        borderRadius: theme.radius.xl,
    },
}));

interface ScannedResultProps {
    image: string;
    points?: Point[];
    deleteImage: () => void;
}

const ScannedResult = ({ image, points, deleteImage }: ScannedResultProps) => {
    const { classes } = useStyles();
    const { convertImageDataToBase64 } = useImageConverter();
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const padding = 50;
    const [startPoints, setStartPoints] = useState<Point[]>([]);
    const [changedPoints, setChangedPoints] = useState<Point[]>([]);
    const [imageData, setImageData] = useState<ImageData>();
    const [prevWidth, setPrevWidth] = useState<number>(window.innerWidth - padding);
    const [prevHeight, setPrevHeight] = useState<number>(window.innerHeight - padding);
    const { t } = useTranslation({ prefix: DocumentsModuleConfig.module_translation_prefix + "scanner.scanned_result" });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (showEdit) {
            return;
        }
        const fixedPoints = [];
        if (points) {
            const alongWidth = window.innerWidth - padding;
            const alongHeight = window.innerHeight - padding;

            // Resize the points of will windows witdh to acomodate the padding
            const pointsResized = points.map((point) => {
                const x = point.x;
                const y = point.y;
                const newX = (x * alongWidth) / window.innerWidth;
                const newY = (y * alongHeight) / window.innerHeight;
                return { x: newX, y: newY };
            });

            fixedPoints.push(
                { x: pointsResized[0].x, y: pointsResized[0].y },
                { x: pointsResized[1].x, y: pointsResized[1].y },
                { x: pointsResized[3].x, y: pointsResized[3].y },
                { x: pointsResized[2].x, y: pointsResized[2].y }
            );
        }
        setStartPoints(changedPoints && changedPoints.length === 4 ? changedPoints : fixedPoints);
    }, [changedPoints, points, showEdit]);

    const handleScreenResizing = useCallback(() => {
        const alongWidth = window.innerWidth - padding;
        const alongHeight = window.innerHeight - padding;

        setChangedPoints((points) => {
            const newPoints = [];
            for (let i = 0; i < points.length; i++) {
                const x = points[i].x;
                const y = points[i].y;

                const newX = (x * alongWidth) / prevWidth;
                const newY = (y * alongHeight) / prevHeight;
                newPoints.push({ x: newX, y: newY });
            }
            return newPoints;
        });

        setPrevHeight(window.innerHeight - padding);
        setPrevWidth(window.innerWidth - padding);
    }, [prevHeight, prevWidth]);

    useEffect(() => {
        window.addEventListener("resize", handleScreenResizing);
        return () => {
            window.removeEventListener("resize", handleScreenResizing);
        };
    }, [handleScreenResizing]);

    useEffect(() => {
        const base64Image = image;
        const tempImage = new Image();
        tempImage.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = tempImage.width;
            canvas.height = tempImage.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(tempImage, 0, 0);
            setImageData(ctx.getImageData(0, 0, tempImage.width, tempImage.height));
        };
        tempImage.src = base64Image;
    }, [image]);

    return (
        <Paper shadow="md" p="md" radius="md" className={classes.card}>
            <canvas ref={canvasRef} className={classes.canvas}></canvas>
            <ThemeIcon style={{ cursor: "pointer" }} color={"red"} radius={"xl"} p={"md"} mr={"xs"} onClick={() => setShowDelete(true)}>
                <FontAwesomeIcon icon={faTrash} />
            </ThemeIcon>
            <ThemeIcon style={{ cursor: "pointer" }} color={"blue"} radius={"xl"} p={"md"} mr={"xs"} onClick={() => setShowEdit(true)}>
                <FontAwesomeIcon icon={faPen} />
            </ThemeIcon>
            {imageData && (
                <ThemeIcon style={{ cursor: "pointer" }} color={"green"} radius={"xl"} p={"md"} onClick={() => console.log(convertImageDataToBase64({ imageData, imageType: "JPEG" }))}>
                    <FontAwesomeIcon icon={faUpload} />
                </ThemeIcon>
            )}
            <Drawer padding={"xl"} size={"sm"} position="bottom" opened={showDelete} onClose={() => setShowDelete(false)}>
                <Grid style={{ height: "100%", paddingBottom: "2rem" }}>
                    <Col span={12}>
                        <Text size={"lg"} weight={500}>
                            {t("delete_confirmation")}
                        </Text>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "end", marginTop: "auto" }}>
                        <Group>
                            <Button variant="light" color={"red"} onClick={() => setShowDelete(false)}>
                                {t("delete_cancel_button")}
                            </Button>
                            <Button
                                variant="filled"
                                color={"red"}
                                onClick={() => {
                                    setShowDelete(false);
                                    deleteImage();
                                }}
                            >
                                {t("delete_confirmation_button")}
                            </Button>
                        </Group>
                    </Col>
                </Grid>
            </Drawer>
            <Modal fullScreen opened={showEdit} onClose={() => setShowEdit(false)}>
                <ThemeIcon style={{ position: "absolute", cursor: "pointer", top: 50, right: 50, zIndex: 10 }} onClick={() => setShowEdit(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </ThemeIcon>
                <div style={{ position: "absolute", top: 0, left: 0 }}>
                    {showEdit && (
                        <PerspectiveCropper
                            handleFinishedCrop={(imageData) => {
                                setImageData(imageData);
                                setShowEdit(false);
                            }}
                            onPointsFinishedChange={(points) => points.length === 4 && setChangedPoints(points)}
                            width={window.innerWidth - padding}
                            height={window.innerHeight - padding}
                            paddingX={padding}
                            paddingY={padding}
                            src={image}
                            startPoints={startPoints}
                        />
                    )}
                </div>
            </Modal>
        </Paper>
    );
};

export default ScannedResult;
