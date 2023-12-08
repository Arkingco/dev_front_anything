'use client';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <head></head>
      <body className="h-full overscroll-none">
        <div className="m-auto h-full max-w-md font-sans">{children}</div>
      </body>
    </html>
  );
}
