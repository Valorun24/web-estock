import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const DetailBarang = () => {
  const { kodeBarang } = useParams(); // Kode barang yang dipindai akan diterima dari URL
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        // Query Firestore berdasarkan kode barang yang dipindai
        const q = query(collection(db, "barang"), where("kodeBarang", "==", kodeBarang));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Jika barang ditemukan, simpan datanya di state
          querySnapshot.forEach((doc) => {
            setBarang(doc.data());
          });
        } else {
          alert("Barang tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching barang: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarang();
  }, [db, kodeBarang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!barang) {
    return <div>Barang tidak ditemukan</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Detail Barang</h1>
        <div className="space-y-4">
          <div>
            <strong>Kode Barang:</strong> {barang.kodeBarang}
          </div>
          <div>
            <strong>Nama Barang:</strong> {barang.nama}
          </div>
          <div>
            <strong>Kategori:</strong> {barang.kategori}
          </div>
          <div>
            <strong>Jumlah Stok:</strong> {barang.stok}
          </div>
          <div>
            <strong>Harga:</strong> Rp {barang.hargaSatuan}
          </div>
          <div>
            <strong>Gambar:</strong>
            {barang.imageUrl ? <img src={barang.imageUrl} alt="Gambar Barang" className="w-32 h-32" /> : "Tidak ada gambar"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
