const generateQrPdf = require("../utils/qrToPdf.js");
const generatePdfForFriend = async (friendName) => {
    try {
        console.log("🔍 Generating PDF for friend:", friendName);  // Debugging log
        
        // Generate the PDF URL using the generateQrPdf function
        const pdfUrl = await generateQrPdf(friendName);  // Assuming this function returns the URL/path of the generated PDF
        
        return pdfUrl;
    } catch (error) {
        console.error("❌ PDF Generation Error:", error);
        throw new Error("Failed to generate PDF");  // Propagate the error for further handling
    }
};

module.exports = generatePdfForFriend;
