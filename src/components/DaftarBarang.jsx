import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar"; // Import Navbar

const DaftarBarang = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar /> {/* Tambahkan Navbar di sini */}
      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Header Daftar Barang dengan tombol Tambah Barang */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Daftar Barang</h1>
          <Link to="/dashboard/tambah-barang" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Tambah Barang
          </Link>
        </div>

        {/* Table of items */}
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nama Barang</th>
              <th className="py-2 px-4 border-b">Kategori</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Tanggal Masuk</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Laptop Dell XPS</td>
              <td className="py-2 px-4 border-b">Elektronik</td>
              <td className="py-2 px-4 border-b">15</td>
              <td className="py-2 px-4 border-b">Rp 15.000.000</td>
              <td className="py-2 px-4 border-b">2024-10-01</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-2">
                  <Link
                    to="/dashboard/edit-barang/1" // Ganti dengan ID barang yang relevan
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => console.log("Hapus barang")} // Implementasikan logika hapus barang
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Smartphone Samsung Galaxy</td>
              <td className="py-2 px-4 border-b">Elektronik</td>
              <td className="py-2 px-4 border-b">30</td>
              <td className="py-2 px-4 border-b">Rp 10.000.000</td>
              <td className="py-2 px-4 border-b">2024-09-25</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-2">
                  <Link
                    to="/dashboard/edit-barang/2" // Ganti dengan ID barang yang relevan
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => console.log("Hapus barang")} // Implementasikan logika hapus barang
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
            {/* Tambahkan baris lain sesuai kebutuhan */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarBarang;
