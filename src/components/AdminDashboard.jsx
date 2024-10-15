import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar"; // Import Navbar

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar /> {/* Tambahkan Navbar di sini */}
      <div className="flex-1 p-6">
        {/* Konten Halaman Dashboard */}
        <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kartu Statistik */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-semibold text-lg">Total Barang</h2>
            <p className="text-2xl">120</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-semibold text-lg">Barang Terjual</h2>
            <p className="text-2xl">85</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-semibold text-lg">Stok Tersisa</h2>
            <p className="text-2xl">35</p>
          </div>

          {/* Grafik atau Chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 shadow rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Statistik Penjualan</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p>Grafik Penjualan (Implementasikan Chart Library di sini)</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Aksi</th>
                <th className="py-2 px-4 border-b">User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">2024-10-01</td>
                <td className="py-2 px-4 border-b">Menambahkan Barang Baru</td>
                <td className="py-2 px-4 border-b">Admin</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2024-10-03</td>
                <td className="py-2 px-4 border-b">Mengubah Stok Barang</td>
                <td className="py-2 px-4 border-b">Admin</td>
              </tr>
              {/* Tambahkan baris lain sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
