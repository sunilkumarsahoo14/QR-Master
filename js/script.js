let qrCodeDiv = document.getElementById("qr-code");
let downloadBtn = document.getElementById("download-btn");

function generateQR() {
    let qrText = document.getElementById("qr-text").value;
    qrCodeDiv.innerHTML = ""; // Clear previous QR code

    if (qrText.trim() !== "") {
        let qrCode = new QRCode(qrCodeDiv, {
            text: qrText,
            width: 200,
            height: 200
        });

        setTimeout(() => {
            downloadBtn.style.display = "block"; // Download button showing
        }, 500);
    } else {
        alert("Please enter text or URL!");
        downloadBtn.style.display = "none"; // Hide button if no input
    }
}

function downloadQR() {
    let qrCanvas = qrCodeDiv.querySelector("canvas");
    if (qrCanvas) {
        // Create a new canvas with padding
        let paddedCanvas = document.createElement("canvas");
        let padding = 10; // 10px padding
        let size = qrCanvas.width + padding * 2;

        paddedCanvas.width = size;
        paddedCanvas.height = size;

        let ctx = paddedCanvas.getContext("2d");

        // Fill background with white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, size, size);

        // Draw the original QR code onto the new canvas with padding
        ctx.drawImage(qrCanvas, padding, padding);

        // Convert to PNG and trigger download
        let qrImage = paddedCanvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = qrImage;
        a.download = "QR_Code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
