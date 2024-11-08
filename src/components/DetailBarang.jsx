import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const DetailBarang = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true); // Menambah state loading
  const [error, setError] = useState(null); // Menambah state error
  const db = getFirestore();

  useEffect(() => {
    const fetchBarang = async () => {
      setLoading(true); // Set loading menjadi true saat fetch data dimulai
      try {
        const docRef = doc(db, "barang", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBarang(docSnap.data());
        } else {
          setError("Barang tidak ditemukan!");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false); // Setelah proses selesai, set loading menjadi false
      }
    };

    fetchBarang();
  }, [id, db]);

  if (loading) {
    return <p>Memuat data barang...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      {barang ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Detail Barang</h1>
          <p>
            <strong>Kode Barang:</strong> {barang.kodeBarang}
          </p>
          <p>
            <strong>Nama Barang:</strong> {barang.nama}
          </p>
          <p>
            <strong>Stok:</strong> {barang.stok}
          </p>
          <p>
            <strong>Kategori:</strong> {barang.kategori}
          </p>
          <p>
            <strong>Harga Satuan:</strong> {barang.hargaSatuan}
          </p>
          {barang.imageUrl && <img src={barang.imageUrl} alt="Gambar Barang" className="h-40" />}
          {barang.qrCodeUrl && <img src={barang.qrCodeUrl} alt="QR Code" className="h-40 mt-4" />}
        </div>
      ) : (
        <p>Barang tidak ditemukan!</p>
      )}
    </div>
  );
};

export default DetailBarang;
