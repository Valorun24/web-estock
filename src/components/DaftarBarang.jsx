import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "./navbar/Navbar"; // Import Navbar

const DaftarBarang = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar /> {/* Tambahkan Navbar di sini */}
      {/* Main content area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Daftar Barang</h1>
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
