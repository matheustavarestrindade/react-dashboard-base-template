import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { IScannedDocument } from "./IScannedImage";
import ScannedResult from "./ScannedResult";
import { useCallback } from "react";

const ScannedResults = ({ document, deleteDocumentFile }: { document: IScannedDocument; deleteDocumentFile: (document_UUID: string, file_uuid: string) => void }) => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    const deleteImage = useCallback(
        (file_uuid: string) => {
            deleteDocumentFile(document.uuid, file_uuid);
        },
        [deleteDocumentFile, document.uuid]
    );

    return (
        <>
            <Carousel dragFree slideSize={250} breakpoints={[{ maxWidth: "sm", slideSize: 200, slideGap: 20 }]} slideGap="xl" align="start" slidesToScroll={mobile ? 1 : 2}>
                {document &&
                    document.scanned_images.map((scanned_image, id) => (
                        <Carousel.Slide key={id}>
                            <ScannedResult image={scanned_image.image} points={scanned_image.points} deleteImage={() => deleteImage(scanned_image.uuid)} />
                        </Carousel.Slide>
                    ))}
            </Carousel>
        </>
    );
};

export default ScannedResults;
