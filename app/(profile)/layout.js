import "../globals.css";
import ProfileNav from '@components/ProfileNav.jsx'
import { useSession, SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <SessionProvider>             
           <ProfileNav />
           {children}
           </SessionProvider>                
      </body>
    </html>
  );
}
