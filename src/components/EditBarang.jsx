import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const EditBarang = () => {
  const { id } = useParams();
  const [kodeBarang, setKodeBarang] = useState("");
  const [nama, setNamaBarang] = useState("");
  const [stok, setJumlahBarang] = useState(0);
  const [kategori, setKategoriBarang] = useState("");
  const [hargaBarang, setHargaBarang] = useState(0);
  const [gambar, setGambar] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [existingQrCode, setExistingQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const barangDoc = await getDoc(doc(db, "barang", id));
        if (barangDoc.exists()) {
          const barangData = barangDoc.data();
          setKodeBarang(barangData.kodeBarang);
          setNamaBarang(barangData.nama);
          setJumlahBarang(barangData.stok);
          setKategoriBarang(barangData.kategori);
          setHargaBarang(barangData.hargaSatuan);
          setExistingImage(barangData.imageUrl);
          setExistingQrCode(barangData.qrCodeUrl);
        }
      } catch (error) {
        console.error("Error fetching barang: ", error);
      }
    };

    fetchBarang();
  }, [id, db]);

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleUpdateBarang = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = existingImage;
      let qrCodeUrl = existingQrCode;

      if (gambar) {
        imageUrl = await uploadFile(gambar, "barang");
      }

      if (qrCode) {
        qrCodeUrl = await uploadFile(qrCode, "qrcode");
      }

      // Konversi hargaBarang dan stok menjadi integer
      const hargaSatuan = parseInt(hargaBarang, 10);
      const stok = parseInt(10);

      await updateDoc(doc(db, "barang", id), {
        kodeBarang,
        nama,
        stok,
        kategori,
        hargaSatuan,
        imageUrl,
        qrCodeUrl,
        updatedDate: new Date().toISOString(),
      });

      alert("Barang berhasil diupdate!");
      navigate("/daftarBarang");
    } catch (error) {
      console.error("Error updating barang: ", error);
      alert("Gagal mengupdate barang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Barang</h1>
        <form onSubmit={handleUpdateBarang} className="space-y-4">
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
            <label>Gambar Barang (Simpan gambar baru untuk mengganti)</label>
            <input type="file" onChange={(e) => setGambar(e.target.files[0])} className="w-full p-2 border" accept="image/*" />
            {existingImage && <img src={existingImage} alt="Existing Image" className="h-20 mt-2" />}
          </div>
          <div>
            <label>QR Code Barang (Simpan QR baru untuk mengganti)</label>
            <input type="file" onChange={(e) => setQrCode(e.target.files[0])} className="w-full p-2 border" accept="image/*" />
            {existingQrCode && <img src={existingQrCode} alt="Existing QR Code" className="h-20 mt-2" />}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Update Barang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBarang;
