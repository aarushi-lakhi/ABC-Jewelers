import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { WishlistProvider } from "@/components/wishlist-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABC Jewelers",
  description: "Jewelry with Purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ProviderTree> <- TODO: If you have multiple providers, consider a helper component */}
        {/* Wrap the components that need context with your providers */}
        <CartProvider> 
          {/* TODO: Are you supposed to nest providers like this? */}
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
        {/* </ProviderTree> */}
      </body>
    </html>
  );
}
