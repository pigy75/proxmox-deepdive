import { useState } from 'react';
import { nodeInfo } from './data';

function Box({ x, y, w, h, node, active, onClick }) {
  const info = nodeInfo[node];
  const isActive = active === node;
  return (
    <g onClick={() => onClick(node)} style={{ cursor: 'pointer' }}>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={isActive ? info.color : '#fff'}
        stroke={info.color} strokeWidth={isActive ? 0 : 2.5}
        style={{ transition: 'all .15s', filter: isActive ? 'drop-shadow(0 4px 8px rgba(0,0,0,.25))' : 'drop-shadow(0 1px 3px rgba(0,0,0,.1))' }}
      />
      <text x={x + w/2} y={y + h/2 - 7} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={isActive ? '#fff' : '#1e293b'}>
        {info.label}
      </text>
      <text x={x + w/2} y={y + h/2 + 11} textAnchor="middle" fontSize="9.5" fill={isActive ? '#ffffffcc' : '#64748b'}>
        {info.detail}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed, label }) {
  const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="2"
        strokeDasharray={dashed ? "5,4" : "0"} markerEnd="url(#arrowhead2)" />
      {label && <text x={midX} y={midY - 6} textAnchor="middle" fontSize="9" fill="#64748b" fontStyle="italic">{label}</text>}
    </g>
  );
}

export default function InternalArchitecture() {
  const [active, setActive] = useState('webui');
  const info = nodeInfo[active];

  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 4 }}>
        🏗️ Architettura Interna — Proxmox VE Software Stack
      </div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
        Clicca un componente per i dettagli. Fonte: Proxmox VE Administration Guide (ufficiale)
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 4px #0001', overflowX: 'auto' }}>
          <svg viewBox="0 0 1080 700" style={{ width: '100%', minWidth: 900, height: 'auto' }}>
            {/* Layer backgrounds */}
            <rect x="10" y="10" width="1060" height="110" rx="14" fill="#eff6ff" stroke="#bfdbfe" strokeDasharray="4,3" />
            <text x="30" y="32" fontSize="11" fontWeight="700" fill="#1e40af">USER TOOLS — interfacce di accesso</text>

            <rect x="10" y="140" width="1060" height="110" rx="14" fill="#fef2f2" stroke="#fecaca" strokeDasharray="4,3" />
            <text x="30" y="162" fontSize="11" fontWeight="700" fill="#dc2626">CLUSTER LAYER — coordinamento multi-nodo</text>

            <rect x="10" y="270" width="1060" height="130" rx="14" fill="#fff7ed" stroke="#fed7aa" strokeDasharray="4,3" />
            <text x="30" y="292" fontSize="11" fontWeight="700" fill="#ea580c">VIRTUALIZZAZIONE — VM e Container</text>

            <rect x="10" y="420" width="1060" height="110" rx="14" fill="#f0fdf4" stroke="#bbf7d0" strokeDasharray="4,3" />
            <text x="30" y="442" fontSize="11" fontWeight="700" fill="#16a34a">STORAGE & RETE — risorse fisiche/virtuali</text>

            <rect x="10" y="550" width="1060" height="140" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeDasharray="4,3" />
            <text x="30" y="572" fontSize="11" fontWeight="700" fill="#9333ea">SERVIZI AVANZATI — HA, Firewall, SDN, Permessi</text>

            {/* User Tools layer */}
            <Box x={60} y={50} w={200} h={55} node="webui" active={active} onClick={setActive} />
            <Box x={440} y={50} w={200} h={55} node="api" active={active} onClick={setActive} />

            {/* Cluster layer */}
            <Box x={150} y={180} w={200} h={55} node="pmxcfs" active={active} onClick={setActive} />
            <Box x={420} y={180} w={200} h={55} node="corosync" active={active} onClick={setActive} />

            {/* Virtualizzazione layer */}
            <Box x={60} y={310} w={200} h={70} node="qm" active={active} onClick={setActive} />
            <Box x={300} y={310} w={200} h={70} node="pct" active={active} onClick={setActive} />

            {/* Storage & Rete layer */}
            <Box x={60} y={460} w={200} h={55} node="pvesm" active={active} onClick={setActive} />
            <Box x={300} y={460} w={200} h={55} node="vmbr" active={active} onClick={setActive} />

            {/* Servizi avanzati layer */}
            <Box x={60} y={590} w={200} h={70} node="haLrm" active={active} onClick={setActive} />
            <Box x={300} y={590} w={200} h={70} node="firewall" active={active} onClick={setActive} />
            <Box x={540} y={590} w={200} h={70} node="pbs" active={active} onClick={setActive} />
            <Box x={780} y={590} w={130} h={70} node="permissions" active={active} onClick={setActive} />
            <Box x={780} y={460} w={200} h={55} node="sdn" active={active} onClick={setActive} />

            {/* Arrows */}
            <Arrow x1={160} y1={105} x2={250} y2={180} label="config" />
            <Arrow x1={540} y1={105} x2={520} y2={180} label="REST" />
            <Arrow x1={250} y1={235} x2={160} y2={310} label="VM config" />
            <Arrow x1={350} y1={235} x2={400} y2={310} label="CT config" />
            <Arrow x1={160} y1={380} x2={160} y2={460} label="disk" />
            <Arrow x1={400} y1={380} x2={400} y2={460} label="net" />
            <Arrow x1={160} y1={515} x2={160} y2={590} label="backup" />
            <Arrow x1={400} y1={515} x2={400} y2={590} label="filter" />
            <Arrow x1={600} y1={515} x2={600} y2={590} dashed label="datastore" />
            <Arrow x1={880} y1={515} x2={845} y2={590} dashed label="ACL" />

            <text x="30" y="678" fontSize="10" fill="#9333ea">↳ Permessi e ACL si applicano trasversalmente a tutti i livelli (VM, storage, rete, cluster)</text>
          </svg>
        </div>

        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px #0001', borderTop: `4px solid ${info.color}` }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 2 }}>{info.label}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>{info.detail}</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {info.notes.map((n, i) => <li key={i} style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.4 }}>{n}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
