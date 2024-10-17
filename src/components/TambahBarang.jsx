import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import QRCode from "qrcode"; // Pustaka untuk generate QR code

const TambahBarang = () => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [nama, setNamaBarang] = useState("");
  const [stok, setJumlahBarang] = useState(0);
  const [kategori, setKategoriBarang] = useState("");
  const [hargaBarang, setHargaBarang] = useState(0);
  const [gambar, setGambar] = useState(null); // Untuk menyimpan file gambar
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  // Fungsi untuk upload file ke Firebase Storage
  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  // Fungsi untuk membuat QR code berdasarkan kodeBarang
  const generateQRCode = async (text) => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(text);
      return qrCodeDataURL;
    } catch (err) {
      console.error("Error generating QR code: ", err);
      return null;
    }
  };

  const handleTambahBarang = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      let qrCodeUrl = "";

      if (gambar) {
        imageUrl = await uploadFile(gambar, "barang");
      }

      // Generate QR code otomatis berdasarkan kode barang
      const qrCodeDataURL = await generateQRCode(kodeBarang);

      if (qrCodeDataURL) {
        // Simpan QR code ke Firebase Storage
        const qrBlob = await (await fetch(qrCodeDataURL)).blob();
        const qrFile = new File([qrBlob], `${kodeBarang}.png`, { type: "image/png" });
        qrCodeUrl = await uploadFile(qrFile, "qrcode");
      }

      const hargaSatuan = parseInt(hargaBarang, 10);
      const stok = parseInt(1000);

      // Tambahkan data barang ke Firestore
      await addDoc(collection(db, "barang"), {
        kodeBarang,
        nama,
        stok,
        kategori,
        hargaSatuan,
        imageUrl,
        qrCodeUrl, // URL dari QR code yang dihasilkan
        addedDate: new Date().toISOString(),
      });

      await addDoc(collection(db, "riwayatAksi"), {
        tanggal: new Date().toISOString(),
        aksi: "Tambah Barang",
        detail: `Barang dengan nama ${nama} berhasil ditambahkan.`,
      });

      alert("Barang berhasil ditambahkan!");
      navigate("/daftarBarang");
    } catch (error) {
      console.error("Error menambah barang: ", error);
      alert("Gagal menambahkan barang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Tambah Barang</h1>
        <form onSubmit={handleTambahBarang} className="space-y-4">
          {/* Input Fields */}
          <div>
            <label>Kode Barang</label>
            <input type="text" value={kodeBarang} onChange={(e) => setKodeBarang(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label>Nama Barang</label>
            <input type="text" value={nama} onChange={(e) => setNamaBarang(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label>Jumlah Barang</label>
            <input type="number" value={stok} onChange={(e) => setJumlahBarang(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label>Kategori Barang</label>
            <select value={kategori} onChange={(e) => setKategoriBarang(e.target.value)} className="w-full p-2 border" required>
              <option value="">Pilih Kategori</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Kabel">Kabel</option>
              <option value="Penerangan">Penerangan</option>
              <option value="Pengamanan Listrik">Pengamanan Listrik</option>
              <option value="Komponen Listrik">Komponen Listrik</option>
              <option value="Baterai">Baterai</option>
            </select>
          </div>
          <div>
            <label>Harga Barang</label>
            <input type="number" value={hargaBarang} onChange={(e) => setHargaBarang(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label>Gambar Barang</label>
            <input type="file" onChange={(e) => setGambar(e.target.files[0])} className="w-full p-2 border" accept="image/*" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Menambahkan..." : "Tambah Barang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahBarang;
