import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import PageHeader from "@/app/components/PageHeader";


export const metadata: Metadata = {
  title: "Octoverse",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageHeader/>
        {children}
      </body>
    </html>
  );
}
