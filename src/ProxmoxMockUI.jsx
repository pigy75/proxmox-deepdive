// Componenti mockup fedeli dell'interfaccia Proxmox VE (no screenshot reali — vedi nota copyright)
import { useState } from 'react';

// Cornice "finestra browser" con barra Proxmox scura tipica
export function ProxmoxWindow({ title = 'https://192.168.1.10:8006', children, height = 380 }) {
  return (
    <div style={{ border: '1px solid #d0d7de', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px #0002', background: '#fff' }}>
      <div style={{ background: '#e8eaed', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #d0d7de' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11.5, color: '#5f6368', fontFamily: 'monospace' }}>
          🔒 {title}
        </div>
      </div>
      <div style={{ background: '#1a1a1a', minHeight: height, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

// Header tipico Proxmox (barra nera in alto con logo + nodo)
export function ProxmoxHeader() {
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #333', fontSize: 12.5 }}>
      <span style={{ fontWeight: 800, color: '#e57000', letterSpacing: 0.5 }}>PROXMOX</span>
      <span style={{ color: '#999' }}>Virtual Environment 9.2</span>
      <div style={{ flex: 1 }} />
      <span style={{ color: '#ccc' }}>root@pam</span>
    </div>
  );
}

// Pannello/dialog modale tipico (es. wizard "Create VM", "Add Storage")
export function ProxmoxDialog({ title, children, width = 480 }) {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width, background: '#2b2b2b', borderRadius: 4, boxShadow: '0 8px 30px #000a', border: '1px solid #444'
    }}>
      <div style={{ background: '#363636', padding: '9px 14px', fontSize: 13, fontWeight: 600, color: '#eee', borderBottom: '1px solid #444' }}>
        {title}
      </div>
      <div style={{ padding: 16, color: '#ddd', fontSize: 12.5 }}>
        {children}
      </div>
    </div>
  );
}

// Campo input mockup
export function MField({ label, value, placeholder, highlight }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11.5, color: '#aaa', marginBottom: 4 }}>{label}</div>
      <div style={{
        background: '#1f1f1f', border: highlight ? '2px solid #e57000' : '1px solid #555',
        borderRadius: 3, padding: '6px 10px', fontSize: 12.5, color: value ? '#fff' : '#777',
        boxShadow: highlight ? '0 0 0 3px #e570004d' : 'none'
      }}>
        {value || placeholder}
      </div>
    </div>
  );
}

// Bottone mockup (primario arancione Proxmox, o secondario grigio)
export function MButton({ children, primary, highlight }) {
  return (
    <span style={{
      display: 'inline-block', padding: '6px 16px', borderRadius: 3, fontSize: 12.5, fontWeight: 600,
      background: primary ? '#e57000' : '#444', color: primary ? '#fff' : '#ccc',
      boxShadow: highlight ? '0 0 0 3px #e570006b, 0 2px 8px #0006' : 'none',
      border: primary ? 'none' : '1px solid #555'
    }}>
      {children}
    </span>
  );
}

// Cursore/puntatore animato che indica dove cliccare
export function ClickPointer({ x, y, label }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', border: '3px solid #e57000',
        animation: 'pulse 1.4s infinite', position: 'relative'
      }}>
        <style>{`@keyframes pulse { 0% { transform: scale(0.8); opacity: 1; } 70% { transform: scale(1.6); opacity: 0; } 100% { opacity: 0; } }`}</style>
      </div>
      <div style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20, borderRadius: '50%', background: '#e57000', boxShadow: '0 2px 6px #0008' }} />
      {label && (
        <div style={{ position: 'absolute', top: 28, left: 0, background: '#1a1a1a', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', fontWeight: 600 }}>
          {label}
        </div>
      )}
    </div>
  );
}

// Sidebar tipica Proxmox a sinistra (Datacenter > Nodo > risorse)
export function ProxmoxSidebar({ activeItem }) {
  const items = ['Datacenter', '└ pve (Nodo)', '  ├ 100 (VM)', '  ├ 101 (CT)', '  └ local-lvm'];
  return (
    <div style={{ width: 170, background: '#262626', borderRight: '1px solid #3a3a3a', fontSize: 12, color: '#ccc', paddingTop: 6 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: '6px 10px', background: it.includes(activeItem) ? '#3a3a3a' : 'transparent',
          borderLeft: it.includes(activeItem) ? '3px solid #e57000' : '3px solid transparent',
          color: it.includes(activeItem) ? '#fff' : '#bbb', whiteSpace: 'pre'
        }}>
          {it}
        </div>
      ))}
    </div>
  );
}
