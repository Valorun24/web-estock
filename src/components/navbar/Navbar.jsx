// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Logout berhasil
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
      });
  };

  return (
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
          <Link to="/tambahBarang" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Tambah Barang
          </Link>
        </li>
        <li>
          <Link to="/scanqr" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Scan QR Barang
          </Link>
        </li>
        <li>
          <Link to="/riwayat" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Riwayat Aksi
          </Link>
        </li>
        <li>
          <Link to="/laporanBarang" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Laporan Barang
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
  );
};

export default Navbar;
