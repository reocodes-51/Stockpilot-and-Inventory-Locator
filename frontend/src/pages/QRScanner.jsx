import { useState } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner() {
  const [data, setData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div>
      <h1>QR Scanner</h1>

      <div
        style={{
          width: "400px",
          margin: "auto",
        }}
      >
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) {
              console.log(result);
              setData(result.text);
            }

            if (error) {
              console.log(error);
            }
          }}
        />
      </div>

      <h3>Scanned Result:</h3>

      <p>{data}</p>

      <p>{errorMsg}</p>
    </div>
  );
}

export default QRScanner;

console.log("QR Page Loaded");