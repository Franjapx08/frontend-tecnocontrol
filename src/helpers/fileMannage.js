/**
 * Descargar un archivo tipo blob
 * author FJAP <fjavpradev@gmail.com> 2024-12-18 14:30:12
 * @param {*} response 
 */
export const downloadHttpBlobResponse = (response) => {
    console.log(response);
    const filename = 'export.csv'//response.headers.get('Content-Disposition').split('filename=')[1];
    const fileUrl = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    document.body.removeChild(link);
  };