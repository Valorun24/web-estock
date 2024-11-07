import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const DaftarBarang = () => {
  const [barangList, setBarangList] = useState([]);
  const [search, setSearch] = useState("");
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarang = async () => {
      const barangSnapshot = await getDocs(collection(db, "barang"));
      const barangData = barangSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBarangList(barangData);
    };

    fetchBarang();
  }, [db]);

  // Fungsi untuk hapus barang dari Firestore
  const handleDeleteBarang = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang ini?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "barang", id));
        alert("Barang berhasil dihapus.");
        await addDoc(collection(db, "riwayatAksi"), {
          tanggal: new Date().toISOString(),
          aksi: "Hapus Barang",
          detail: `Barang dengan ID ${id} berhasil dihapus.`,
        });
        setBarangList((prevList) => prevList.filter((barang) => barang.id !== id));
      } catch (error) {
        console.error("Error deleting barang: ", error);
        alert("Gagal menghapus barang.");
      }
    }
  };

  // Navigasi ke halaman Tambah Barang
  const handleTambahBarang = () => {
    navigate("/tambahBarang");
  };

  // Navigasi ke halaman Edit Barang
  const handleEditBarang = (id) => {
    navigate(`/editBarang/${id}`);
  };

  // Filter barangList berdasarkan pencarian
  const filteredBarangList = barangList.filter((barang) => barang.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-2">Daftar Barang</h1>

        {/* Input Pencarian */}
        <div className="mb-4">
          <input type="text" placeholder="Cari barang..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border" />
        </div>

        <button onClick={handleTambahBarang} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Tambah Barang
        </button>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Kode Barang</th>
              <th className="py-2 px-4">Nama Barang</th>
              <th className="py-2 px-4">Jumlah Barang</th>
              <th className="py-2 px-4">Kategori</th>
              <th className="py-2 px-4">Harga Satuan</th>
              <th className="py-2 px-4">Gambar</th>
              <th className="py-2 px-4">QR Code</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBarangList.map((barang) => (
              <tr key={barang.id}>
                <td className="py-2 px-4">{barang.kodeBarang}</td>
                <td className="py-2 px-4">{barang.nama}</td>
                <td className="py-2 px-4">{barang.stok}</td>
                <td className="py-2 px-4">{barang.kategori}</td>
                <td className="py-2 px-4">{barang.hargaSatuan}</td>
                <td className="py-2 px-4">{barang.imageUrl && <img src={barang.imageUrl} alt="Gambar" className="h-20" />}</td>
                <td className="py-2 px-4">{barang.qrCodeUrl && <img src={barang.qrCodeUrl} alt="QR Code" className="h-20" />}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditBarang(barang.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteBarang(barang.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarBarang;
