document.addEventListener("DOMContentLoaded", () => {
    const qrCodeBlock = document.querySelector(".qr-code");
    const downloadBtn = document.querySelector(".qr-download");
    const shareBtn = document.querySelector(".qr-share");
    const generateBtn = document.querySelector(".qr-btn");
    const qrInput = document.querySelector("input[type='url']");
    const errorMess = document.querySelector(".error-msg");
    const firstStep = document.querySelector(".qr-first-step")
    const secondStep = document.querySelector(".qr-second-step")

    const generateQR = () => {
        if(qrInput.value === "") {
            errorMess.textContent = "Input can't be empty.";
            return;
        }
        var qrcode = new QRCode(qrCodeBlock, {
            text: qrInput.value,
            width: 183,
            height: 183,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        firstStep.style.display = "none";
        secondStep.style.display = "block";
    }

    const copyQR = () => {
        const canvas = document.querySelector("canvas");

        try{
            canvas.toBlob((blob) => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        "image/png": blob
                    })
                ]);
            });
        } catch(err) {
            console.log(err);
        }
        shareBtn.textContent = "Copied!";
    }

    const downloadQR = () => {
        const imgLink = qrCodeBlock.querySelector("img").src;
        const canvasQR = qrCodeBlock.querySelector("canvas");

        downloadBtn.href = imgLink || canvasQR.toDataURL();
        
        downloadBtn.download = "download";

    }

    shareBtn.addEventListener("click", copyQR);
    downloadBtn.addEventListener("click", downloadQR);
    generateBtn.addEventListener("click", generateQR);
});