import { useCallback } from "react";

const useImageConverter = () => {
    const convertImageDataToBase64 = useCallback(({ imageData, imageType = "JPEG" }: { imageData: ImageData; imageType: string }): String | null | undefined => {
        const canvas: HTMLCanvasElement = document.createElement("CANVAS") as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) return;
        let base64Data: string;
        canvas.height = imageData.height;
        canvas.width = imageData.width;
        ctx.putImageData(imageData, 0, 0);
        base64Data = canvas.toDataURL(imageType);
        return base64Data;
    }, []);

    return { convertImageDataToBase64 };
};

export default useImageConverter;
