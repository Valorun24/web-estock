import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const DaftarBarang = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect ke halaman login setelah logout berhasil
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar (Sidebar) */}
      <nav className="w-64 bg-blue-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-600 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/daftarBarang" className="block px-4 py-2 hover:bg-blue-600 rounded">
              Daftar Barang
            </Link>
          </li>
          <li>
            <Link to="/dashboard/tambah-barang" className="block px-4 py-2 hover:bg-blue-600 rounded">
              Tambah Barang
            </Link>
          </li>
          <li>
            <Link to="/dashboard/scan-qr" className="block px-4 py-2 hover:bg-blue-600 rounded">
              Scan QR Barang
            </Link>
          </li>
          <li>
            <Link to="/dashboard/riwayat" className="block px-4 py-2 hover:bg-blue-600 rounded">
              Riwayat Aksi
            </Link>
          </li>
        </ul>
        {/* Logout Button */}
        <div className="mt-10">
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Daftar Barang</h1>
        {/* Table of items */}
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nama Barang</th>
              <th className="py-2 px-4 border-b">Kategori</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Tanggal Masuk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Laptop Dell XPS</td>
              <td className="py-2 px-4 border-b">Elektronik</td>
              <td className="py-2 px-4 border-b">15</td>
              <td className="py-2 px-4 border-b">Rp 15.000.000</td>
              <td className="py-2 px-4 border-b">2024-10-01</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Smartphone Samsung Galaxy</td>
              <td className="py-2 px-4 border-b">Elektronik</td>
              <td className="py-2 px-4 border-b">30</td>
              <td className="py-2 px-4 border-b">Rp 10.000.000</td>
              <td className="py-2 px-4 border-b">2024-09-25</td>
            </tr>
            {/* Tambahkan baris lain sesuai kebutuhan */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarBarang;
