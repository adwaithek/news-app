import { NewsProvider } from "@/context/NewsContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NewsProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </NewsProvider>
      </body>
    </html>
  );
}
