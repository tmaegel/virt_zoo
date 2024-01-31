import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Container from "@mui/material/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtueller Zoo",
  description: "Verwaltung der virtuellen Hologramme in einer Inventarliste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
