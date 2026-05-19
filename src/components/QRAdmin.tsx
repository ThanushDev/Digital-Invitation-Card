import React, { useState, useEffect } from 'react';

declare const QRCode: any;

interface GuestCard {
  name: string;
  url: string;
}

export function QRAdmin() {
  const [baseUrl, setBaseUrl] = useState(() => {
    return window.location.origin + window.location.pathname.replace(/\/$/, '');
  });
  const [guestText, setGuestText] = useState('');
  const [cards, setCards] = useState<GuestCard[]>([]);
  const [generated, setGenerated] = useState(false);
  const [qrLibReady, setQrLibReady] = useState(false);

  // Load QRCode.js dynamically
  useEffect(() => {
    if ((window as any).QRCode) { setQrLibReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => setQrLibReady(true);
    document.head.appendChild(script);
  }, []);

  // හිස් පේළි (Double Enter) මඟින් පමණක් වෙනස් අමුත්තන් වෙන් කරයි
  const getNames = () =>
    guestText
      .split(/\n\s*\n/) 
      .map(n => n.trim())
      .filter(n => n.length > 0);

  const generate = () => {
    if (!baseUrl.trim()) { alert('URL eka denna!'); return; }
    const names = getNames();
    if (!names.length) { alert('Guest names denna!'); return; }
    if (!qrLibReady) { alert('QR library load වෙමින් — ටිකක් wait කරන්න'); return; }

    const newCards: GuestCard[] = names.map(name => ({
      name,
      url: baseUrl.replace(/\/$/, '') + '/?guest=' + encodeURIComponent(name),
    }));
    setCards(newCards);
    setGenerated(true);
  };

  // QR Codes Render කිරීම
  useEffect(() => {
    if (!generated || !cards.length || !qrLibReady) return;
    cards.forEach((card, idx) => {
      const el = document.getElementById(`qr-canvas-${idx}`);
      if (!el) return;
      el.innerHTML = ''; // පැරණි QR Code මකා දැමීම
      new (window as any).QRCode(el, {
        text: card.url,
        width: 140,
        height: 140,
        colorDark: '#0a1845',
        colorLight: '#ffffff',
        correctLevel: (window as any).QRCode.CorrectLevel.M,
      });
    });
  }, [cards, generated, qrLibReady]);

  // ⭐ QR Code ඩවුන්ලෝඩ් බොත්තම සක්‍රීය කිරීමේ ක්‍රමය (100% Working)
  const downloadOne = (idx: number, name: string) => {
    const el = document.getElementById(`qr-canvas-${idx}`);
    const canvas = el?.querySelector('canvas');
    const img = el?.querySelector('img');
    
    let dataUrl = '';
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else if (img) {
      dataUrl = img.src;
    }

    if (!dataUrl) {
      alert('QR Code එක බාගත කර ගැනීමට නොහැක. නැවත උත්සාහ කරන්න.');
      return;
    }

    const a = document.createElement('a');
    const cleanName = name.replace(/[\n\s]+/g, '_');
    a.download = `QR_${cleanName}.png`;
    a.href = dataUrl;
    a.click();
  };

  const printAll = () => {
    if (!cards.length) return;
    const items = cards.map((card, idx) => {
      const el = document.getElementById(`qr-canvas-${idx}`);
      const canvas = el?.querySelector('canvas');
      const img = el?.querySelector('img');
      const src = canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
      
      return `
        <div style="display:inline-block;text-align:center;margin:8px;padding:14px 12px 10px;border:1.5px solid #3b5fc9;border-radius:10px;break-inside:avoid;background:#fff;width:168px;vertical-align:top">
          <img src="${src}" width="140" height="140" style="border-radius:6px"/>
          <div style="font-family:sans-serif;font-size:12px;font-weight:700;margin-top:8px;color:#0a1845;word-break:break-word;line-height:1.4;white-space:pre-line;">${card.name}</div>
          <div style="font-family:sans-serif;font-size:9px;color:#888;margin-top:3px">Scan for your invitation</div>
        </div>`;
    }).join('');

    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Guest QR Codes</title>
      <style>
        body{margin:16px;background:#fff}
        @media print{body{margin:6px} @page{size:A4;margin:10mm}}
      </style>
    </head><body>
      <div style="text-align:center;margin-bottom:12px;font-family:sans-serif;font-size:13px;color:#666">
        Guest QR Codes (${cards.length})
      </div>
      <div style="text-align:center">${items}</div>
      <script>window.onload=()=>window.print()<\/script>
    </body></html>`);
    w.document.close();
  };

  const copyUrl = (url: string, btn: HTMLButtonElement) => {
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = '✓ Copied';
      setTimeout(() => { btn.textContent = 'Copy URL'; }, 1500);
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1845',
      color: '#fff',
      fontFamily: 'sans-serif',
      padding: '24px 16px',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, color: '#fff', margin: 0 }}>Guest QR Code Generator</h1>
        </div>

        <div style={{
          background: '#0d1b4c',
          border: '1px solid #3b5fc9',
          borderRadius: 12,
          padding: '20px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {/* URL input */}
            <div style={{ flex: '1 1 280px' }}>
              <label style={{ display: 'block', fontSize: 11, color: '#00d4ff', marginBottom: 6 }}>
                INVITATION BASE URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={e => setBaseUrl(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0a1845',
                  border: '1px solid #3b5fc9',
                  borderRadius: 6,
                  color: '#fff',
                  padding: '9px 12px',
                  fontSize: 12,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Names text area */}
            <div style={{ flex: '1 1 280px' }}>
              <label style={{ display: 'block', fontSize: 11, color: '#00d4ff', marginBottom: 6 }}>
                GUEST NAMES (DOUBLE ENTER TO SEPARATE)
              </label>
              <textarea
                value={guestText}
                onChange={e => setGuestText(e.target.value)}
                placeholder={"Senior Lecturer,\nMrs. D. Ravichandran\n\nKamal Perera"}
                style={{
                  width: '100%',
                  height: 110,
                  background: '#0a1845',
                  border: '1px solid #3b5fc9',
                  borderRadius: 6,
                  color: '#fff',
                  padding: '9px 12px',
                  boxSizing: 'border-box',
                  fontSize: 13,
                  resize: 'vertical',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button
              onClick={generate}
              style={{
                background: 'linear-gradient(135deg, #3b5fc9, #00d4ff)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ✨ Generate QR Codes
            </button>
            {generated && (
              <button
                onClick={printAll}
                style={{
                  background: '#0a1845',
                  color: '#fff',
                  border: '1px solid #3b5fc9',
                  borderRadius: 6,
                  padding: '10px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                🖨️ Print All ({cards.length})
              </button>
            )}
          </div>
        </div>

        {/* QR Display Grid */}
        {generated && cards.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}>
            {cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                <div id={`qr-canvas-${idx}`} style={{ display: 'flex', justifyContent: 'center' }} />

                <div style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#0a1845',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  margin: '6px 0',
                  wordBreak: 'break-word'
                }}>
                  {card.name}
                </div>

                <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                  <button
                    onClick={() => downloadOne(idx, card.name)}
                    style={{
                      flex: 1,
                      fontSize: 11,
                      padding: '6px 2px',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      background: '#f5f5f5',
                      color: '#0a1845',
                      cursor: 'pointer',
                    }}
                  >
                    ↓ Save
                  </button>
                  <button
                    onClick={e => copyUrl(card.url, e.currentTarget)}
                    style={{
                      flex: 1,
                      fontSize: 11,
                      padding: '6px 2px',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      background: '#f5f5f5',
                      color: '#0a1845',
                      cursor: 'pointer',
                    }}
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
