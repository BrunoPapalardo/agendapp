export const getCroppedImg = (imageSrc: string, pixelCrop: any) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    return new Promise<string>((resolve) => {
        image.onload = () => {
            const { width, height } = image;
            const cropWidth = pixelCrop.width;
            const cropHeight = pixelCrop.height;
            const cropX = pixelCrop.x;
            const cropY = pixelCrop.y;

            canvas.width = cropWidth;
            canvas.height = cropHeight;
            ctx?.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            resolve(canvas.toDataURL("image/jpeg"));
        };
    });
};