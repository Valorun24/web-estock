import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Navbar from "./navbar/Navbar";

const LaporanBarang = () => {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "barang"));
        const barangData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBarangList(barangData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching barang: ", error);
        setLoading(false);
      }
    };

    fetchBarang();
  }, [db]);

  // Fungsi untuk ekspor ke PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Barang", 14, 10);
    doc.autoTable({
      head: [["Kode Barang", "Nama Barang", "Stok", "Kategori", "Harga Satuan", "Gambar", "QR Code"]],
      body: barangList.map((barang) => [
        barang.kodeBarang,
        barang.nama,
        barang.stok,
        barang.kategori,
        barang.hargaSatuan,
        barang.imageUrl ? "Ada" : "Tidak Ada", // Menandakan adanya gambar
        barang.qrCodeUrl ? "Ada" : "Tidak Ada", // Menandakan adanya QR code
      ]),
    });
    doc.save("laporan_barang.pdf");
  };

  const filteredBarangList = barangList.filter((barang) => barang.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Laporan Barang</h1>

        {/* Pencarian Barang */}
        <div className="mb-4">
          <input type="text" placeholder="Cari barang..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border" />
        </div>

        {/* Tombol Ekspor PDF */}
        <div className="mb-4">
          <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded">
            Ekspor ke PDF
          </button>
        </div>

        {/* Tabel Laporan */}
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Kode Barang</th>
                <th className="py-2 px-4 border">Nama Barang</th>
                <th className="py-2 px-4 border">Stok</th>
                <th className="py-2 px-4 border">Kategori</th>
                <th className="py-2 px-4 border">Harga Satuan</th>
                <th className="py-2 px-4 border">Gambar</th>
                <th className="py-2 px-4 border">QR Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredBarangList.map((barang) => (
                <tr key={barang.id}>
                  <td className="py-2 px-4 border">{barang.kodeBarang}</td>
                  <td className="py-2 px-4 border">{barang.nama}</td>
                  <td className="py-2 px-4 border">{barang.stok}</td>
                  <td className="py-2 px-4 border">{barang.kategori}</td>
                  <td className="py-2 px-4 border">{barang.hargaSatuan}</td>
                  <td className="py-2 px-4 border">{barang.imageUrl && <img src={barang.imageUrl} alt="Gambar Barang" className="h-20" />}</td>
                  <td className="py-2 px-4 border">{barang.qrCodeUrl && <img src={barang.qrCodeUrl} alt="QR Code" className="h-20" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LaporanBarang;
