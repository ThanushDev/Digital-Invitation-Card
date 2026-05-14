import React, { useState, useRef } from 'react';

declare const QRCode: any;

interface GuestCard {
  name: string;
  url: string;
  canvasRef: HTMLCanvasElement | null;
}

export function QRAdmin() {
  const [baseUrl, setBaseUrl] = useState(() => {
    return window.location.origin + window.location.pathname.replace(/\/$/, '');
  });
  const [guestText, setGuestText] = useState('');
  const [cards, setCards] = useState<GuestCard[]>([]);
  const [generated, setGenerated] = useState(false);
  const [qrLibReady, setQrLibReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load QRCode.js dynamically
  React.useEffect(() => {
    if ((window as any).QRCode) { setQrLibReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => setQrLibReady(true);
    document.head.appendChild(script);
  }, []);

  const getNames = () =>
    guestText.split('\n').map(n => n.trim()).filter(n => n.length > 0);

  const generate = () => {
    if (!baseUrl.trim()) { alert('URL eka denna!'); return; }
    const names = getNames();
    if (!names.length) { alert('Guest names denna!'); return; }
    if (!qrLibReady) { alert('QR library load වෙමින් — ටිකක් wait කරන්න'); return; }

    const newCards: GuestCard[] = names.map(name => ({
      name,
      url: baseUrl.replace(/\/$/, '') + '/?guest=' + encodeURIComponent(name),
      canvasRef: null,
    }));
    setCards(newCards);
    setGenerated(true);
  };

  // Render QR codes after cards state updates
  React.useEffect(() => {
    if (!generated || !cards.length || !qrLibReady) return;
    cards.forEach((card, idx) => {
      const el = document.getElementById(`qr-canvas-${idx}`);
      if (!el || el.childNodes.length > 0) return;
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

  const downloadOne = (idx: number, name: string) => {
    const el = document.getElementById(`qr-canvas-${idx}`);
    const canvas = el?.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'qr-' + name.replace(/\s+/g, '_') + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const printAll = () => {
    if (!cards.length) return;
    const items = cards.map((card, idx) => {
      const el = document.getElementById(`qr-canvas-${idx}`);
      const canvas = el?.querySelector('canvas');
      const src = canvas ? canvas.toDataURL('image/png') : '';
      return `
        <div style="display:inline-block;text-align:center;margin:8px;padding:14px 12px 10px;border:1.5px solid #3b5fc9;border-radius:10px;break-inside:avoid;background:#fff;width:168px;vertical-align:top">
          <img src="${src}" width="140" height="140" style="border-radius:6px"/>
          <div style="font-family:sans-serif;font-size:12px;font-weight:700;margin-top:8px;color:#0a1845;word-break:break-word;line-height:1.4">${card.name}</div>
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
        Innovation &amp; Technology Expo — Guest QR Codes (${cards.length})
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
      fontFamily: 'Inter, sans-serif',
      padding: '28px 20px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', color: '#00d4ff', marginBottom: 6 }}>
            ADMIN PANEL
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
            Guest QR Code Generator
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
            Invitation URL automatically detected · Each guest gets a unique QR code
          </p>
        </div>

        {/* Input section */}
        <div style={{
          background: '#0d1b4c',
          border: '1px solid #3b5fc9',
          borderRadius: 14,
          padding: '20px 22px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* URL field */}
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.08em', color: '#00d4ff', marginBottom: 8, textTransform: 'uppercase' }}>
                Invitation Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={e => setBaseUrl(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0a1845',
                  border: '1px solid #3b5fc9',
                  borderRadius: 8,
                  color: '#fff',
                  padding: '9px 12px',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>
                GitHub Pages deploy කළාම auto-fill වෙනවා
              </p>
            </div>

            {/* Guest names */}
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.08em', color: '#00d4ff', marginBottom: 8, textTransform: 'uppercase' }}>
                Guest Names — One per line
              </label>
              <textarea
                value={guestText}
                onChange={e => setGuestText(e.target.value)}
                placeholder={'Kamal Perera\nNimali Silva\nSanjaya Fernando'}
                style={{
                  width: '100%',
                  height: 120,
                  background: '#0a1845',
                  border: '1px solid #3b5fc9',
                  borderRadius: 8,
                  color: '#fff',
                  padding: '9px 12px',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
                {getNames().length > 0 ? `${getNames().length} guests entered` : 'Names type කරන්න'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              onClick={generate}
              style={{
                background: 'linear-gradient(135deg, #3b5fc9, #00d4ff)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ✨ Generate QR Codes
            </button>
            {generated && (
              <>
                <button
                  onClick={printAll}
                  style={{
                    background: '#0a1845',
                    color: '#fff',
                    border: '1px solid #3b5fc9',
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  🖨️ Print All ({cards.length})
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info box */}
        {generated && (
          <div style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 20,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}>
            <span style={{ color: '#00d4ff', fontSize: 16 }}>ℹ</span>
            <span>
              <strong style={{ color: '#fff' }}>QR Lifetime:</strong> GitHub repo live නම් — permanent. URL change / repo delete කළා නම් expire වෙනවා.
              QR code scan කළාම directly ඒ guest ගේ name ekka invitation open වෙනවා.
            </span>
          </div>
        )}

        {/* QR Grid */}
        {generated && cards.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
            gap: 14,
          }}>
            {cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '14px 12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {/* QR render target */}
                <div id={`qr-canvas-${idx}`} />

                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0a1845',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  lineHeight: 1.35,
                }}>
                  {card.name}
                </div>

                <div style={{ display: 'flex', gap: 6, width: '100%' }}>
                  <button
                    onClick={() => downloadOne(idx, card.name)}
                    style={{
                      flex: 1,
                      fontSize: 11,
                      padding: '5px 4px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
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
                      padding: '5px 4px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
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

        {!generated && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.2)',
            fontSize: 14,
            padding: '40px 0',
            border: '1px dashed rgba(59,95,201,0.4)',
            borderRadius: 12,
          }}>
            Guest names enter කරලා Generate click කරන්න
          </div>
        )}
      </div>
    </div>
  );
}
