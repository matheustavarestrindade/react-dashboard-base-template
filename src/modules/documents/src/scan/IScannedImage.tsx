import { Point } from "document-scanner-opencv/lib/Utilities";

export default interface ScannedImage {
    image: string;
    points: Point[];
    uuid: string;
}

export interface IScannedDocument {
    scanned_images: ScannedImage[];
    title: string;
    description: string;
    category: string;
    uuid: string;
}
