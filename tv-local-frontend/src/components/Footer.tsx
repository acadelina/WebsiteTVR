import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Text */}
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} TV Local. All rights reserved.</p>

        {/* Social Links */}
        <div className="flex gap-5 text-lg">
          <Link href="https://www.facebook.com/profile.php?id=100050001168484&locale=ro_RO" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaFacebookF />
          </Link>
          <Link href="https://www.instagram.com/erdelyifigyelo/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </Link>
          <Link href="https://youtube.com/@ErdelyiFigyelo" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaYoutube />
          </Link>
          
        </div>
      </div>
    </footer>
  );
}
