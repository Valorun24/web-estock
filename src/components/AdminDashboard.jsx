import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect ke halaman login setelah logout berhasil
        navigate("/");
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
        <ul className="space-y-3">
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

      {/* Main content area (Dashboard Home) */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-4xl font-bold mt-3">120</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold">Barang Baru</h3>
            <p className="text-4xl font-bold mt-3">15</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold">Total Transaksi</h3>
            <p className="text-4xl font-bold mt-3">350</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold">Barang Tersedia</h3>
            <p className="text-4xl font-bold mt-3">105</p>
          </div>
        </div>

        {/* Grafik (Sementara Placeholder) */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Grafik Penjualan (Placeholder)</h3>
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Grafik Penjualan Akan Ditampilkan Disini</p>
          </div>
        </div>

        {/* Daftar Barang Terbaru */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Barang Terbaru</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nama Barang</th>
                <th className="py-2 px-4 border-b">Kategori</th>
                <th className="py-2 px-4 border-b">Stok</th>
                <th className="py-2 px-4 border-b">Tanggal Masuk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Kipas Angin</td>
                <td className="py-2 px-4 border-b">Elektronik</td>
                <td className="py-2 px-4 border-b">15</td>
                <td className="py-2 px-4 border-b">2024-10-01</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Lampu Philips</td>
                <td className="py-2 px-4 border-b">Penerangan</td>
                <td className="py-2 px-4 border-b">40</td>
                <td className="py-2 px-4 border-b">2024-09-28</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Kabel Listrik</td>
                <td className="py-2 px-4 border-b">Kelistrikan</td>
                <td className="py-2 px-4 border-b">30</td>
                <td className="py-2 px-4 border-b">2024-09-25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
