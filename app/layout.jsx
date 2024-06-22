import "@styles/global.css";
export const metadata = {
  title: "Task!",
  description: "Task Round!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
