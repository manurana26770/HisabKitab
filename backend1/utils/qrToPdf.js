const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Convert QR code image to PDF
const generateQrPdf = async (friendId) => {
  const qrImagePath = path.join(__dirname, "../public/qrcodes", `${friendId}.png`); // Fix path
  const pdfPath = qrImagePath.replace(".png", ".pdf");

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    doc.text(`QR Code for Friend ID: ${friendId}`, { align: 'center' });

    // Check if QR image exists before trying to add it
    if (!fs.existsSync(qrImagePath)) {
      console.error("❌ QR Image not found at:", qrImagePath);
      return reject(new Error("QR Image file not found"));
    }

    doc.image(qrImagePath, { fit: [250, 250], align: 'center' });
    doc.end();

    stream.on('finish', () => resolve(`/qrcodes/${friendId}.pdf`));
    stream.on('error', reject);
  });
};


module.exports = generateQrPdf;