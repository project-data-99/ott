import { Poppins } from "next/font/google";

import { AuthProvider, DashboardAuthGuard } from "@/components";
import { Content, Main, Sidebar } from "@/components/dashboard";
import Providers from "@/store/provider";
import "@/static/css/tailwind.config.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Spectraflix",
  description: "Spectraflix",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-dark text-lightAlt antialiased`}>
        <Providers>
          <AuthProvider>
            <DashboardAuthGuard>
              <Main>
                <Sidebar />
                <Content>{children}</Content>
              </Main>
            </DashboardAuthGuard>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
