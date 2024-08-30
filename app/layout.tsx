import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} bg-gray-700`}>
      <nav className="p-2 flex justify-start space-x-4 text-white bg-gray-950">
        <Link href='/' className="mr-2 text-white hover:bg-gray-700 p-3 rounded-xl">User CRUD App</Link>
        <Link href='/users' className="mr-4 text-white hover:bg-gray-700 p-3 rounded-xl">Get Users</Link>
        <Link href='/users/add' className="mr-4 text-white hover:bg-gray-700 p-3 rounded-xl">Add User</Link>
      </nav>
      {children}
    </body>
  </html>
  
  );
}
