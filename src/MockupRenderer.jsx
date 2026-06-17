import { ProxmoxWindow, ProxmoxHeader, ProxmoxDialog, MField, MButton, ClickPointer, ProxmoxSidebar } from './ProxmoxMockUI';

// Schermata blu tipica dell'installer Debian/Proxmox (testo bianco su blu)
function InstallerScreen({ children, height = 380 }) {
  return (
    <div style={{ background: '#0a2540', minHeight: height, padding: 24, color: '#fff', fontFamily: 'monospace', fontSize: 13, position: 'relative' }}>
      {children}
    </div>
  );
}

function InstallerBox({ title, children }) {
  return (
    <div style={{ background: '#1a3a5c', border: '1px solid #3a6090', borderRadius: 4, padding: 16, maxWidth: 480, margin: '20px auto' }}>
      {title && <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>{title}</div>}
      {children}
    </div>
  );
}

export default function MockupRenderer({ kind }) {
  switch (kind) {

    case 'rufus':
      return (
        <ProxmoxWindow title="Rufus 4.x" height={300}>
          <div style={{ background: '#2d2d2d', padding: 16, color: '#ddd', fontSize: 12 }}>
            <MField label="Device" value="🔌 SanDisk USB 3.0 (16 GB)" highlight />
            <MField label="Boot selection" value="📄 proxmox-ve_9.2-1.iso" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, position: 'relative' }}>
              <MButton primary highlight>START</MButton>
              <ClickPointer x={-10} y={-6} />
            </div>
          </div>
        </ProxmoxWindow>
      );

    case 'boot':
      return (
        <InstallerScreen>
          <InstallerBox title="Boot Menu">
            {['UEFI: SanDisk USB 3.0', 'Windows Boot Manager', 'UEFI: Hard Disk'].map((it, i) => (
              <div key={i} style={{ padding: '6px 10px', background: i === 0 ? '#e57000' : 'transparent', color: i === 0 ? '#fff' : '#aac', marginBottom: 4, borderRadius: 2 }}>
                {i === 0 ? '▶ ' : '  '}{it}
              </div>
            ))}
          </InstallerBox>
        </InstallerScreen>
      );

    case 'installer-menu':
      return (
        <InstallerScreen>
          <InstallerBox title="Proxmox VE — Installer">
            {['Install Proxmox VE (Graphical)', 'Install Proxmox VE (Terminal UI)', 'Advanced Options', 'Boot from existing OS'].map((it, i) => (
              <div key={i} style={{ padding: '6px 10px', background: i === 0 ? '#e57000' : 'transparent', color: i === 0 ? '#fff' : '#aac', marginBottom: 4, borderRadius: 2, fontWeight: i === 0 ? 700 : 400 }}>
                {i === 0 ? '▶ ' : '  '}{it}
              </div>
            ))}
          </InstallerBox>
        </InstallerScreen>
      );

    case 'eula':
      return (
        <InstallerScreen height={340}>
          <InstallerBox title="END USER LICENSE AGREEMENT (EULA)">
            <div style={{ fontSize: 11, color: '#9ab', lineHeight: 1.6, marginBottom: 16, maxHeight: 100, overflow: 'hidden' }}>
              This software is released under the GNU Affero General Public License...
              Copyright (C) Proxmox Server Solutions GmbH...
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, position: 'relative' }}>
              <MButton>Abort</MButton>
              <MButton primary highlight>I agree</MButton>
              <ClickPointer x={75} y={-8} />
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'disk-select':
      return (
        <InstallerScreen>
          <InstallerBox title="Target Harddisk">
            <MField label="Harddisk" value="💾 /dev/sda — Samsung SSD 500GB" highlight />
            <div style={{ marginTop: 10 }}><MButton>Options</MButton></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, position: 'relative' }}>
              <MButton primary highlight>Next</MButton>
              <ClickPointer x={-5} y={-8} />
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'locale':
      return (
        <InstallerScreen>
          <InstallerBox title="Location and Time Zone Selection">
            <MField label="Country" value="🇮🇹 Italy" highlight />
            <MField label="Time zone" value="Europe/Rome" />
            <MField label="Keyboard Layout" value="Italian" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <MButton primary>Next</MButton>
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'password':
      return (
        <InstallerScreen>
          <InstallerBox title="Administration Password and Email Address">
            <MField label="Password" value="••••••••••••" highlight />
            <MField label="Confirm" value="••••••••••••" />
            <MField label="Email" value="admin@tuodominio.it" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <MButton primary>Next</MButton>
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'network':
      return (
        <InstallerScreen height={400}>
          <InstallerBox title="Management Network Configuration">
            <MField label="Management Interface" value="enp0s31f6" />
            <MField label="Hostname (FQDN)" value="pve.tuodominio.local" highlight />
            <MField label="IP Address (CIDR)" value="192.168.1.10/24" highlight />
            <MField label="Gateway" value="192.168.1.1" />
            <MField label="DNS Server" value="192.168.1.1" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <MButton primary>Next</MButton>
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'summary':
      return (
        <InstallerScreen height={400}>
          <InstallerBox title="Summary">
            <div style={{ fontSize: 11.5, lineHeight: 1.8, color: '#cde' }}>
              Country: Italy &nbsp;·&nbsp; Timezone: Europe/Rome<br/>
              Disk: /dev/sda (ext4) &nbsp;·&nbsp; FQDN: pve.tuodominio.local<br/>
              IP: 192.168.1.10/24 &nbsp;·&nbsp; Gateway: 192.168.1.1
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, position: 'relative' }}>
              <MButton primary highlight>Install</MButton>
              <ClickPointer x={-5} y={-8} />
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'reboot':
      return (
        <InstallerScreen>
          <InstallerBox>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>✅</div>
              <div style={{ marginBottom: 16 }}>Installation successful!</div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <MButton primary highlight>Reboot</MButton>
                <ClickPointer x={-5} y={-8} />
              </div>
            </div>
          </InstallerBox>
        </InstallerScreen>
      );

    case 'login':
      return (
        <ProxmoxWindow title="https://192.168.1.10:8006" height={320}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
            <div style={{ background: '#262626', border: '1px solid #444', borderRadius: 6, padding: 24, width: 280 }}>
              <div style={{ textAlign: 'center', color: '#e57000', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>PROXMOX VE</div>
              <MField label="User name" value="root" highlight />
              <MField label="Password" value="••••••••••••" />
              <MField label="Realm" value="Linux PAM standard authentication" />
              <div style={{ marginTop: 14 }}><MButton primary>Login</MButton></div>
            </div>
          </div>
        </ProxmoxWindow>
      );

    case 'nav-datacenter':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ display: 'flex' }}>
            <div style={{ position: 'relative' }}>
              <ProxmoxSidebar activeItem="Datacenter" />
              <ClickPointer x={50} y={6} />
            </div>
            <div style={{ flex: 1, padding: 20, color: '#888', fontSize: 12 }}>Seleziona "Datacenter" nella sidebar →</div>
          </div>
        </ProxmoxWindow>
      );

    case 'nav-storage':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ display: 'flex' }}>
            <ProxmoxSidebar activeItem="Datacenter" />
            <div style={{ flex: 1, padding: 16 }}>
              <div style={{ color: '#ccc', fontSize: 12, marginBottom: 10, borderBottom: '1px solid #3a3a3a', paddingBottom: 8 }}>
                Datacenter → <span style={{ color: '#fff', fontWeight: 600 }}>Storage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', marginBottom: 10 }}>
                <MButton primary highlight>Add ▾</MButton>
                <ClickPointer x={-10} y={-8} />
              </div>
              <div style={{ background: '#222', borderRadius: 4, padding: 10, color: '#999', fontSize: 11.5 }}>local (dir) · local-lvm (lvmthin)</div>
            </div>
          </div>
        </ProxmoxWindow>
      );

    case 'add-storage':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 320 }}>
            <ProxmoxDialog title="Add: Directory">
              <MField label="ID" value="backup-storage" highlight />
              <MField label="Directory" value="/mnt/backup" />
              <div style={{ fontSize: 11.5, color: '#aaa', margin: '8px 0 4px' }}>Content</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: '#ccc' }}>
                <span>☑ Disk image</span><span>☑ ISO image</span><span>☑ Backup</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Add</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'nav-network':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ display: 'flex' }}>
            <ProxmoxSidebar activeItem="pve" />
            <div style={{ flex: 1, padding: 16 }}>
              <div style={{ color: '#ccc', fontSize: 12, marginBottom: 10, borderBottom: '1px solid #3a3a3a', paddingBottom: 8 }}>
                pve → System → <span style={{ color: '#fff', fontWeight: 600 }}>Network</span>
              </div>
              <table style={{ width: '100%', fontSize: 11.5, color: '#ccc', borderCollapse: 'collapse' }}>
                <tr style={{ color: '#888' }}><td>Name</td><td>Type</td><td>Active</td></tr>
                <tr style={{ background: '#2a2a2a' }}><td style={{ padding: 4 }}>vmbr0</td><td>Linux Bridge</td><td>✓</td></tr>
              </table>
            </div>
          </div>
        </ProxmoxWindow>
      );

    case 'add-user':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 300 }}>
            <ProxmoxDialog title="Add User">
              <MField label="User name" value="mrossi" highlight />
              <MField label="Realm" value="Proxmox VE authentication server" />
              <MField label="Password" value="••••••••" />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Add</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'upload-iso':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 280 }}>
            <ProxmoxDialog title="Upload">
              <MField label="File" value="📄 ubuntu-24.04-server.iso" highlight />
              <div style={{ background: '#1f1f1f', borderRadius: 3, height: 6, marginTop: 10, overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#e57000' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Upload</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'create-vm-button':
    case 'create-ct-button':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ padding: 16, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <MButton highlight={kind === 'create-ct-button'} primary={kind === 'create-ct-button'}>Create CT</MButton>
              <MButton highlight={kind === 'create-vm-button'} primary={kind === 'create-vm-button'}>Create VM</MButton>
            </div>
            <ClickPointer x={kind === 'create-vm-button' ? 480 : 350} y={-6} />
          </div>
        </ProxmoxWindow>
      );

    case 'vm-general':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 300 }}>
            <ProxmoxDialog title="Create: Virtual Machine — General">
              <MField label="Node" value="pve" />
              <MField label="VM ID" value="100" />
              <MField label="Name" value="ubuntu-test" highlight />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Next</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'vm-os':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 300 }}>
            <ProxmoxDialog title="Create: Virtual Machine — OS">
              <MField label="Storage" value="local" />
              <MField label="ISO image" value="ubuntu-24.04-server.iso" highlight />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Next</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'vm-resources':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 320 }}>
            <ProxmoxDialog title="Create: Virtual Machine — CPU / Memory">
              <MField label="Cores" value="2" />
              <MField label="Memory (MiB)" value="2048" />
              <MField label="Disk size (GiB)" value="32" />
              <div style={{ fontSize: 11, color: '#888', marginTop: 8 }}>Valori di default adatti per iniziare</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><MButton primary>Next</MButton></div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'vm-confirm':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ position: 'relative', height: 300 }}>
            <ProxmoxDialog title="Create: Virtual Machine — Confirm">
              <div style={{ fontSize: 11.5, color: '#bbb', lineHeight: 1.7 }}>
                VM 100 (ubuntu-test) · 2 vCPU · 2048 MiB · 32 GiB
              </div>
              <div style={{ marginTop: 10, fontSize: 12 }}>☑ <b style={{ color: '#fff' }}>Start after created</b></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14, position: 'relative' }}>
                <MButton primary highlight>Finish</MButton>
                <ClickPointer x={-5} y={-8} />
              </div>
            </ProxmoxDialog>
          </div>
        </ProxmoxWindow>
      );

    case 'vm-console':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ display: 'flex' }}>
            <ProxmoxSidebar activeItem="100" />
            <div style={{ flex: 1, padding: 16, position: 'relative' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <MButton highlight primary>{'>_ Console'}</MButton>
                <MButton>Start</MButton>
                <MButton>Shutdown</MButton>
              </div>
              <ClickPointer x={20} y={-6} />
              <div style={{ background: '#000', height: 180, borderRadius: 4, padding: 8, color: '#0f0', fontSize: 10.5, fontFamily: 'monospace' }}>
                Ubuntu 24.04 LTS ubuntu-test tty1_
              </div>
            </div>
          </div>
        </ProxmoxWindow>
      );

    case 'backup':
      return (
        <ProxmoxWindow>
          <ProxmoxHeader />
          <div style={{ display: 'flex' }}>
            <ProxmoxSidebar activeItem="100" />
            <div style={{ flex: 1, padding: 16, position: 'relative' }}>
              <div style={{ color: '#ccc', fontSize: 12, marginBottom: 10 }}>VM 100 → <span style={{ color: '#fff', fontWeight: 600 }}>Backup</span></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MButton primary highlight>Backup now</MButton>
                <ClickPointer x={-10} y={-8} />
              </div>
            </div>
          </div>
        </ProxmoxWindow>
      );

    default:
      return (
        <ProxmoxWindow>
          <div style={{ color: '#888', padding: 40, textAlign: 'center' }}>Mockup non disponibile</div>
        </ProxmoxWindow>
      );
  }
}
