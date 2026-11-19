import "../../shared/style.css";
export const metadata = { title: "Hookie Next.js form" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
