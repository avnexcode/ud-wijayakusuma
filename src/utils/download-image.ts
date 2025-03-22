export const processImageUrl = (url: string | undefined) => {
  if (!url) return null;

  // Return the original URL (with timestamp) for direct usage
  return url;
};

// Extract filename from URL while preserving the timestamp parameter
export const extractFileName = (url: string) => {
  try {
    // Get base URL without query parameters
    const baseUrl = url.split("?")[0];

    // Extract the filename from the base URL
    const fileName = baseUrl?.split("/").pop() ?? "bukti-pembayaran.jpeg";

    return fileName;
  } catch (error) {
    if (error) {
      return "bukti-pembayaran.jpeg";
    }
    return "bukti-pembayaran.jpeg";
  }
};

// Function to handle printing the payment receipt
export const handlePrint = (noteImageUrl?: string) => {
  if (!noteImageUrl) return;

  const imageUrl = processImageUrl(noteImageUrl);
  if (!imageUrl) return;

  // Create a new window with just the image
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  // Create content for the print window
  printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bukti Pembayaran</title>
          <style>
            body { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              margin: 0; 
            }
            img { max-width: 100%; max-height: 100vh; }
            @media print {
              @page { size: auto; margin: 0mm; }
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="Bukti Pembayaran" />
          <script>
            // Print automatically once loaded
            window.onload = function() {
              setTimeout(() => {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
  printWindow.document.close();
};

// Function to handle downloading the image
export const handleDownload = async (noteImageUrl?: string) => {
  if (!noteImageUrl) return;

  const imageUrl = processImageUrl(noteImageUrl);
  if (!imageUrl) return;

  try {
    // Fetch the image with the timestamp parameter to prevent caching issues
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    // Set download filename
    const fileName = extractFileName(noteImageUrl);
    downloadLink.download = fileName;

    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error("Error downloading image:", error);
    // You might want to add a toast notification here
  }
};
