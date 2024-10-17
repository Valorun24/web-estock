import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/AdminDashboard"; // Import Admin Dashboard
import DaftarBarang from "./components/DaftarBarang"; // Import halaman DaftarBarang
import TambahBarang from "./components/TambahBarang";
import EditBarang from "./components/EditBarang";
import RiwayatAksi from "./components/RiwayatAksi";
import ScanQR from "./components/ScanQR";
import DetailBarang from "./components/DetailBarang";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1uYGPuFn1djSjAGimbNKs8n29yy1A3u0",
  authDomain: "estockelektronik-76a37.firebaseapp.com",
  projectId: "estockelektronik-76a37",
  storageBucket: "estockelektronik-76a37.appspot.com",
  messagingSenderId: "261932821159",
  appId: "1:261932821159:web:66d14e1900e1d5231f4982",
  measurementId: "G-0XDDG95CL6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Welcome />} /> */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* Route untuk halaman dashboard */}
        <Route path="/daftarBarang" element={<DaftarBarang />} /> {/* Daftar Barang sebagai halaman default */}
        <Route path="tambahBarang" element={<TambahBarang />} />
        <Route path="/editBarang/:id" element={<EditBarang />} />
        <Route path="/riwayat" element={<RiwayatAksi />} />
        <Route path="/scanQR" element={<ScanQR />} />
        <Route path="/barang/:kodeBarang" element={<DetailBarang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
