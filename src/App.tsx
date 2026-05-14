import React from 'react';
import { InvitationPoster } from './components/InvitationPoster';
import { QRAdmin } from './components/QRAdmin';

export function App() {
  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get('admin') === 'true';

  if (isAdmin) {
    return <QRAdmin />;
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0a1845] md:flex md:items-center md:justify-center md:p-4">
      <InvitationPoster />
    </div>
  );
}
