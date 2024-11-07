import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FaHome, FaBox, FaPlus, FaQrcode, FaHistory, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

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
          <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaHome className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/daftarBarang" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaBox className="mr-2" />
            Daftar Barang
          </Link>
        </li>
        <li>
          <Link to="/tambahBarang" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaPlus className="mr-2" />
            Tambah Barang
          </Link>
        </li>
        <li>
          <Link to="/scanqr" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaQrcode className="mr-2" />
            Scan QR Barang
          </Link>
        </li>
        <li>
          <Link to="/riwayat" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaHistory className="mr-2" />
            Riwayat Aksi
          </Link>
        </li>
        <li>
          <Link to="/laporanBarang" className="flex items-center px-4 py-2 hover:bg-blue-600 rounded">
            <FaFileAlt className="mr-2" />
            Laporan Barang
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-10">
        <button onClick={handleLogout} className="w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
