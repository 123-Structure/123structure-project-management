import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outils",
  description: "Accéder à la boîte à outils",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
