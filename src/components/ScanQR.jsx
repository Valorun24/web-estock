import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleScan = async (data) => {
    if (data) {
      const cleanedData = data.trim();
      setScanResult(cleanedData); // Simpan hasil scan QR Code
      console.log("Hasil Scan:", cleanedData); // Log hasil scan

      try {
        // Validasi bahwa hasil scan adalah ID yang valid
        if (!cleanedData || cleanedData === "") {
          alert("QR Code tidak valid!");
          return;
        }

        // Ambil dokumen berdasarkan ID dari QR Code
        const docRef = doc(db, "barang", cleanedData);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const barangData = docSnap.data();
          console.log("Data Barang:", barangData); // Log data barang

          // Periksa apakah nama barang ada
          if (barangData?.kodeBarang) {
            alert(`Barang Ditemukan: ${barangData.kodeBarang}`); // Menampilkan nama barang yang ditemukan

            // Arahkan ke halaman detail barang
            navigate(`/detailBarang/${cleanedData}`);
          } else {
            alert("Barang tidak ditemukan!");
          }

          setScanResult(null); // Reset hasil scan setelah diarahkan
        } else {
          alert("Barang tidak ditemukan!"); // Jika barang tidak ditemukan
        }
      } catch (error) {
        console.error("Error fetching barang:", error); // Log jika ada error
        setError("Terjadi kesalahan saat mengambil data dari server."); // Set error untuk UI
      }
    }
  };

  const handleError = (err) => {
    console.error("Error saat memindai QR Code:", err); // Log error
    setError("Gagal mengakses kamera."); // Set error untuk UI
  };

  const resetScan = () => {
    setScanResult(null); // Reset hasil scan
    setError(null); // Reset pesan error jika ada
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Scan QR Code</h1>
        <div className="mb-6">
          {error && <p className="text-red-500">{error}</p>}
          {scanResult ? <p className="text-green-500">Hasil Scan: {scanResult}</p> : <p className="text-gray-500">Arahkan kamera ke QR Code untuk memindai</p>}
        </div>

        {/* Komponen untuk Scan QR */}
        {!scanResult && (
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result?.text); // Memproses hasil QR scan
              }
              if (!!error) {
                handleError(error); // Menangani error dari kamera
              }
            }}
            constraints={{ facingMode: "environment" }} // Menggunakan kamera belakang
            containerStyle={{
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          />
        )}

        {/* Tombol Scan Ulang */}
        {scanResult && (
          <button onClick={resetScan} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Scan Ulang
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
