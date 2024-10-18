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
      setScanResult(data); // Simpan hasil scan QR Code
      try {
        // Cari barang berdasarkan kode QR (misal kodeBarang tersimpan dalam QR)
        const docRef = doc(db, "barang", data); // 'data' di sini dianggap sebagai ID dokumen dari Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const barangData = docSnap.data();
          alert(`Barang Ditemukan: ${barangData.nama}`);
          navigate(`/detailBarang/${data}`); // Mengarahkan ke halaman detail barang dengan ID hasil scan
        } else {
          alert("Barang tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error fetching barang: ", error);
        setError("Gagal memindai QR Code.");
      }
    }
  };

  const handleError = (err) => {
    console.error("Error while scanning QR code: ", err);
    setError("Gagal mengakses kamera.");
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
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text); // Mengambil teks dari QR code yang discan
            }
            if (!!error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: "environment" }} // Menggunakan kamera belakang
          containerStyle={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
        />

        {scanResult && (
          <button onClick={() => setScanResult(null)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Scan Ulang
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
