import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Navbar from "./navbar/Navbar";

const RiwayatAksi = () => {
  const [riwayat, setRiwayat] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchRiwayat = async () => {
      const riwayatCollection = collection(db, "riwayatAksi");
      const riwayatSnapshot = await getDocs(riwayatCollection);
      const riwayatList = riwayatSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRiwayat(riwayatList);
    };

    fetchRiwayat();
  }, [db]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Riwayat Aksi</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
                <th className="px-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.tanggal}</td>
                  <td className="border px-4 py-2">{item.aksi}</td>
                  <td className="border px-4 py-2">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatAksi;
