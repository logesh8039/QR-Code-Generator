import { createElement, useState } from "react";

export const QRcode = () => {
    const [img,setImg] = useState('');
    const [loading , setLoading] = useState(false);
    const [qrdata,setQrData] = useState("");
    const [qrSize,setQrSize] = useState("150");
    

    function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${qrdata}`;
            link.click();
            document.body.removeChild(link);  
        }).catch((error)=>{
            console.error("Error downloading QR Code",error);
        })
    }

   async function generateQR(){
    setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
        }
        catch(error){
            console.error("Error generating QR Code",error)
        }
        finally{
            setLoading(false);
        }
        
   }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {img && <img src={img} alt="" className="qr-code-image"/>}
        {loading && <p>Please Wait...</p>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for QR code
            </label>
            <input type="text" value={qrdata} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-label" >
                Image size (e.g., 150):
            </label>
            <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>
            <button className="generate-btn" onClick={generateQR} disabled={loading}>Generate QR Code</button>
            <button className="download-btn" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed by <span>Logesh</span></p>
    </div>
  )
}
