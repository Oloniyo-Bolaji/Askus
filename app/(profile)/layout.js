import "../globals.css";
import { NextProvider } from '@/utils/context.js'
import ProfileNav from '@components/ProfileNav.jsx'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextProvider> 
           <ProfileNav />
           {children}
        </NextProvider>
      </body>
    </html>
  );
}
