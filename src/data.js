// Fonte: documentazione ufficiale Proxmox VE (pve.proxmox.com/pve-docs) — versione 9.x

export const modules = [
  { id: 'setup', label: 'Setup', area: 'fase1', week: 1, icon: '🛠️', desc: 'Installazione e prima configurazione host' },
  { id: 'config-base', label: 'Configurazione Base', area: 'fase2', week: 2, icon: '⚙️', desc: 'Storage, rete, utenti, permessi' },
  { id: 'utilizzo-base', label: 'Utilizzo Base', area: 'fase3', week: 3, icon: '🖥️', desc: 'VM/CT, snapshot, console, backup vzdump' },
  { id: 'config-avanzata', label: 'Configurazione Avanzata', area: 'fase4', week: 4, icon: '🔧', desc: 'Cluster, HA, PBS, networking avanzato' },
  { id: 'utilizzo-avanzato', label: 'Utilizzo Avanzato', area: 'fase5', week: 5, icon: '🚀', desc: 'Migrazione, troubleshooting, API/automazione' },
];

export const STATUS = { todo: 'Da iniziare', doing: 'In corso', done: 'Completato' };
export const STATUS_COLORS = {
  todo: { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b', dot: '#94a3b8' },
  doing: { bg: '#fef3c7', border: '#fbbf24', text: '#92400e', dot: '#f59e0b' },
  done: { bg: '#dcfce7', border: '#4ade80', text: '#166534', dot: '#22c55e' },
};
export const AREA_COLORS = {
  fase1: { bg: '#dbeafe', border: '#3b82f6', label: '1. Setup', text: '#1e40af' },
  fase2: { bg: '#e0e7ff', border: '#6366f1', label: '2. Config Base', text: '#3730a3' },
  fase3: { bg: '#d1fae5', border: '#10b981', label: '3. Utilizzo Base', text: '#065f46' },
  fase4: { bg: '#fef3c7', border: '#f59e0b', label: '4. Config Avanzata', text: '#92400e' },
  fase5: { bg: '#fce7f3', border: '#ec4899', label: '5. Utilizzo Avanzato', text: '#9d174d' },
};

export const referenceCards = {
  setup: {
    title: 'Setup — Installazione',
    icon: '🛠️',
    sections: [
      {
        title: 'Requisiti di Sistema',
        rows: [
          { concept: 'CPU', definition: '64bit Intel 64 o AMD64, con flag VT-x/AMD-V per virtualizzazione completa', example: 'Intel VT / AMD-V abilitato in BIOS', note: 'Per PCI(e) passthrough serve anche VT-d/AMD-Vi' },
          { concept: 'RAM minima', definition: '1GB per valutazione, 2GB raccomandati per OS + servizi Proxmox', example: '+ RAM dedicata per ogni guest', note: 'ZFS/Ceph: +1GB RAM per ogni TB di storage usato' },
          { concept: 'Storage OS', definition: 'Hardware RAID con cache protetta a batteria (BBU), o ZFS senza RAID HW', example: 'RAID1 con BBU, oppure ZFS mirror', note: 'ZFS e Ceph NON sono compatibili con RAID controller hardware' },
          { concept: 'NIC', definition: 'Almeno una scheda di rete, multiple Gbit ridondanti raccomandate', example: '2x NIC per ridondanza + storage dedicato', note: 'Numero NIC dipende da storage e cluster setup' },
        ]
      },
      {
        title: 'Installazione',
        rows: [
          { concept: 'ISO ufficiale', definition: 'Immagine hybrid ISO scaricabile dal sito Proxmox', example: 'proxmox.com/downloads → Proxmox VE → ISO', note: 'Funziona sia da CD/DVD che da USB flash drive' },
          { concept: 'USB flash drive', definition: 'Metodo consigliato — più veloce della masterizzazione', example: 'dd / Rufus / Etcher per scrivere la ISO', note: 'NON usare UNetbootin — non è compatibile' },
          { concept: 'Installer guidato', definition: 'Partizionamento disco, timezone, lingua, rete', example: 'Setup completo in pochi minuti', note: 'Installazione su Debian esistente: solo utenti avanzati' },
          { concept: 'Browser supportati', definition: 'Per accedere alla web UI dopo installazione', example: 'Firefox, Chrome, Edge, Safari (versioni recenti)', note: 'Da mobile: interfaccia touch semplificata automatica' },
        ]
      },
      {
        title: 'Primo Accesso',
        rows: [
          { concept: 'Web UI', definition: 'Interfaccia di management integrata, nessun tool separato necessario', example: 'https://IP-SERVER:8006', note: 'Certificato self-signed al primo accesso — normale' },
          { concept: 'pveperf', definition: 'Tool incluso per overview rapido prestazioni CPU/disco', example: 'pveperf (da shell)', note: 'Benchmark rapido — per test approfonditi servono tool dedicati' },
          { concept: 'Repository', definition: 'Proxmox usa repository Debian + repository Proxmox dedicati', example: 'pve-no-subscription / pve-enterprise', note: 'Senza subscription: usa pve-no-subscription repo' },
        ]
      }
    ]
  },

  'config-base': {
    title: 'Configurazione Base',
    icon: '⚙️',
    sections: [
      {
        title: 'Storage',
        rows: [
          { concept: 'Storage locale', definition: 'LVM, Directory, ZFS — gestiti sul singolo nodo', example: 'local-lvm (default), local (directory)', note: 'ZFS: combina filesystem + volume manager con protezione dati' },
          { concept: 'Storage di rete', definition: 'NFS, CIFS, iSCSI, Ceph RBD/CephFS, Proxmox Backup Server', example: 'NFS share da NAS aziendale', note: 'Storage condiviso permette live-migration senza downtime' },
          { concept: 'LVM-Thin', definition: 'Local storage con supporto a snapshot e thin-provisioning', example: 'Datacenter → Storage → Add → LVM-Thin', note: 'Storage VM/CT più comune per setup single-node' },
          { concept: 'Aggiungere storage', definition: 'Da web UI: Datacenter → Storage → Add', example: 'Tipo: Directory / NFS / LVM / ZFS', note: 'Ogni storage ha "Content" — definisce cosa può contenere (VM disk, backup, ISO...)' },
        ]
      },
      {
        title: 'Networking',
        rows: [
          { concept: 'Bridge (vmbr0)', definition: 'Switch virtuale che collega NIC fisica alle VM, modello bridged', example: 'vmbr0 → eth0 fisica', note: 'Tutte le VM su un bridge sono come collegate allo stesso switch' },
          { concept: 'VLAN (802.1q)', definition: 'Segmentazione del traffico a livello di bridge/VM', example: 'VM con VLAN tag 10 su vmbr0', note: 'Configurabile per singola interfaccia VM' },
          { concept: 'Bonding', definition: 'Aggregazione di più NIC fisiche per ridondanza/banda', example: 'bond0: eth0+eth1, mode 802.3ad (LACP)', note: 'Richiede supporto LACP sullo switch fisico' },
          { concept: 'Configurazione rete', definition: 'Via web UI: nodo → System → Network', example: '/etc/network/interfaces sotto il cofano', note: 'Modifiche di rete spesso richiedono riavvio interfaccia' },
        ]
      },
      {
        title: 'Utenti e Permessi',
        rows: [
          { concept: 'Realm di autenticazione', definition: 'Sorgente di autenticazione: PAM, Proxmox VE auth, LDAP, AD', example: 'Datacenter → Permissions → Realms', note: 'Supporta Microsoft Active Directory nativamente' },
          { concept: 'Ruoli (Roles)', definition: 'Set di privilegi predefiniti o custom', example: 'PVEAdmin, PVEVMAdmin, PVEAuditor', note: 'Role-based access control su ogni oggetto (path)' },
          { concept: 'Permessi (ACL)', definition: 'Associazione Utente/Gruppo + Ruolo + Path', example: 'User mrossi + Role PVEVMAdmin su /vms/100', note: 'Modello a path gerarchico, eredità verso il basso' },
          { concept: 'Pool', definition: 'Raggruppamento logico di VM/CT/storage per gestione permessi', example: 'Pool "ClienteA" con tutte le sue VM', note: 'Utile per consulenti multi-tenant con accessi separati' },
        ]
      }
    ]
  },

  'utilizzo-base': {
    title: 'Utilizzo Base',
    icon: '🖥️',
    sections: [
      {
        title: 'VM e Container',
        rows: [
          { concept: 'VM (QEMU/KVM)', definition: 'Virtualizzazione completa — qualsiasi OS guest', example: 'Create VM → ISO Windows/Linux', note: 'Isolamento completo, overhead leggermente superiore a CT' },
          { concept: 'Container (LXC)', definition: 'Virtualizzazione a livello OS — condivide il kernel host', example: 'Create CT → template Ubuntu/Debian', note: 'Solo Linux, molto più leggero delle VM' },
          { concept: 'Template', definition: 'VM/CT predefinita usata come base per cloni veloci', example: 'Convert to template → clona N volte', note: 'Clone "linked" risparmia spazio, "full" è indipendente' },
          { concept: 'Console', definition: 'Accesso grafico a VM/CT via browser', example: 'noVNC integrato, no client necessario', note: 'Per CT: anche console testuale diretta' },
        ]
      },
      {
        title: 'Snapshot e Backup',
        rows: [
          { concept: 'Snapshot', definition: 'Stato istantaneo della VM/CT salvato sullo stesso storage', example: 'Prima di un aggiornamento critico: snapshot', note: 'NON sostituisce un backup — stesso storage, stesso rischio' },
          { concept: 'vzdump', definition: 'Tool di backup integrato — crea archivi consistenti', example: 'Backup job: Datacenter → Backup → Add', note: 'Funziona anche su VM in esecuzione (live backup)' },
          { concept: 'Modalità backup', definition: 'Snapshot (online), Suspend, Stop', example: 'Snapshot: nessun downtime percepito', note: 'Snapshot mode richiede storage che supporti snapshot' },
          { concept: 'Formato backup', definition: 'Ottimizzato con sparse file e I/O minimizzato', example: 'vzdump file .vma.zst (VM) / .tar.zst (CT)', note: 'Compressione e formato pensati per efficienza storage' },
        ]
      },
      {
        title: 'Gestione Quotidiana',
        rows: [
          { concept: 'Migrazione (offline)', definition: 'Sposta VM/CT spenta su altro nodo', example: 'Click destro VM → Migrate', note: 'Richiede storage condiviso o trasferimento disco' },
          { concept: 'Risorse VM', definition: 'CPU, RAM, disco modificabili a caldo (alcuni) o a freddo', example: 'Hardware tab → Memory → Edit', note: 'CPU hotplug e memory hotplug supportati su Linux guest' },
          { concept: 'Tag', definition: 'Etichette colorate per organizzare VM/CT in vista', example: 'Tag "produzione", "test", "cliente-X"', note: 'Filtro rapido nella vista Datacenter' },
          { concept: 'Note', definition: 'Campo testo libero per documentare la VM', example: 'Markdown supportato nelle note', note: 'Utile per documentare scopo, credenziali, dipendenze' },
        ]
      }
    ]
  },

  'config-avanzata': {
    title: 'Configurazione Avanzata',
    icon: '🔧',
    sections: [
      {
        title: 'Cluster',
        rows: [
          { concept: 'pmxcfs', definition: 'Proxmox Cluster File System — filesystem distribuito per config', example: 'Replica configurazioni in tempo reale via Corosync', note: 'Storage max 30MB — più che sufficiente per migliaia di VM' },
          { concept: 'Multi-master', definition: 'Ogni nodo può gestire l\'intero cluster, nessun single point of failure', example: 'Qualsiasi nodo accessibile per management completo', note: 'Design unico — altri hypervisor richiedono management server centrale' },
          { concept: 'Creare cluster', definition: 'pvecm create sul primo nodo, poi join dagli altri', example: 'pvecm create CLUSTERNAME', note: 'Quorum richiede maggioranza nodi attivi (no split-brain)' },
          { concept: 'Join nodo', definition: 'Aggiunge un nodo a un cluster esistente', example: 'pvecm add IP-NODO-ESISTENTE', note: 'Il nodo che fa join perde la sua configurazione locale' },
        ]
      },
      {
        title: 'High Availability',
        rows: [
          { concept: 'HA Manager', definition: 'Rileva failure dei nodi e riavvia automaticamente i servizi', example: 'Watchdog-based fencing integrato', note: 'Nessun tool esterno necessario (no Pacemaker)' },
          { concept: 'HA Group', definition: 'Gruppo di nodi preferiti per il failover di una risorsa', example: 'Priorità nodo1 > nodo2 > nodo3', note: 'Configurabile via Datacenter → HA → Groups' },
          { concept: 'HA Resource', definition: 'VM/CT gestita dal sistema HA', example: 'Datacenter → HA → Add → seleziona VM', note: 'Stato: started/stopped/disabled/ignored' },
          { concept: 'Fencing', definition: 'Isolamento del nodo guasto per evitare conflitti', example: 'Watchdog hardware/software', note: 'Essenziale per evitare split-brain su risorse condivise' },
        ]
      },
      {
        title: 'Proxmox Backup Server (PBS)',
        rows: [
          { concept: 'Integrazione PBS', definition: 'Backup avanzato con deduplicazione e backup incrementali', example: 'Datacenter → Storage → Add → Proxmox Backup Server', note: 'Funzionalità extra rispetto a vzdump standard' },
          { concept: 'Deduplicazione', definition: 'Non salva blocchi di dati già esistenti nel datastore', example: 'VM 50GB → backup incrementale di pochi GB', note: 'Risparmio enorme di spazio su backup frequenti' },
          { concept: 'Client-side encryption', definition: 'Cifratura dei dati prima dell\'invio al server di backup', example: 'Chiave di cifratura gestita lato client', note: 'Il server PBS non vede i dati in chiaro' },
          { concept: 'Sync Job', definition: 'Sincronizzazione tra istanze PBS (es. offsite)', example: 'PBS locale → PBS remoto per disaster recovery', note: 'Supporta anche backup su tape o S3 object storage' },
        ]
      },
      {
        title: 'Networking Avanzato',
        rows: [
          { concept: 'SDN (Software Defined Network)', definition: 'Stack per isolamento di rete basato su zone, per ambienti multi-tenant', example: 'Datacenter → SDN → Zones', note: 'Supporta VXLAN ed EVPN, installato di default da v8.1' },
          { concept: 'Firewall integrato', definition: 'Filtro packet a livello di VM/CT/nodo/datacenter', example: 'Security Groups per regole riutilizzabili', note: 'Configurabile su 4 livelli: Datacenter, Nodo, VM, CT' },
          { concept: 'Ceph', definition: 'Storage distribuito self-healing, scalabile, gestibile da web UI', example: 'Datacenter → Ceph → installazione guidata', note: 'Richiede almeno 3 nodi per ridondanza reale' },
        ]
      }
    ]
  },

  'utilizzo-avanzato': {
    title: 'Utilizzo Avanzato',
    icon: '🚀',
    sections: [
      {
        title: 'Migrazione e Import',
        rows: [
          { concept: 'Live Migration', definition: 'Sposta VM in esecuzione tra nodi senza downtime', example: 'Richiede storage condiviso tra i nodi', note: 'Equivalente Proxmox di VMware vMotion' },
          { concept: 'Import Wizard', definition: 'Migra guest direttamente da altri hypervisor (es. VMware ESXi)', example: 'Import diretto da storage VMware verso Proxmox', note: 'Introdotto in v8.2 — semplifica enormemente la migrazione' },
          { concept: 'OVF/OVA import', definition: 'Import di archivi Open Virtualization Format', example: 'Import diretto da storage file-based via web UI', note: 'Utile per VM esportate da altri hypervisor' },
          { concept: 'qm importdisk', definition: 'Comando CLI per importare disco virtuale esistente', example: 'qm importdisk 100 disk.vmdk local-lvm', note: 'Per conversioni manuali da VMDK/VHD ad altri formati' },
        ]
      },
      {
        title: 'Automazione e API',
        rows: [
          { concept: 'REST API', definition: 'API RESTful con JSON, completamente definita via JSON Schema', example: 'GET /api2/json/nodes/{node}/qemu', note: 'Permette integrazione con tool di terze parti' },
          { concept: 'pvesh', definition: 'Tool CLI per interagire con l\'API REST direttamente da shell', example: 'pvesh get /nodes/pve/qemu', note: 'Utile per scripting senza dover gestire token HTTP manualmente' },
          { concept: 'API Token', definition: 'Autenticazione programmatica senza password', example: 'Datacenter → Permissions → API Tokens', note: 'Possono avere permessi separati da quelli dell\'utente' },
          { concept: 'CLI tools principali', definition: 'qm (VM), pct (container), pvesm (storage), pvecm (cluster)', example: 'qm start 100 / pct enter 101', note: 'Tab completion intelligente su tutti i comandi' },
        ]
      },
      {
        title: 'Troubleshooting',
        rows: [
          { concept: 'Log di sistema', definition: 'Visualizzabili da web UI per nodo, con history e syslog', example: 'Nodo → System → Syslog', note: 'Anche /var/log/syslog e journalctl da shell' },
          { concept: 'Task log', definition: 'Storico di ogni operazione eseguita (backup, migrazione, ecc.)', example: 'Datacenter → Tasks', note: 'Fondamentale per capire perché un\'operazione è fallita' },
          { concept: 'pveperf', definition: 'Benchmark rapido per identificare collo di bottiglia', example: 'pveperf /var/lib/vz', note: 'Solo overview — per test seri usare fio o bonnie++' },
          { concept: 'Quorum perso', definition: 'Cluster senza maggioranza di nodi attivi — risorse bloccate', example: 'pvecm status per verificare stato quorum', note: 'Causa comune: numero pari di nodi senza QDevice' },
        ]
      }
    ]
  },
};

// Architettura interna — componenti del Proxmox software stack
export const nodeInfo = {
  webui: { label: 'Web UI', detail: 'pveproxy (ExtJS)', color: '#2563eb',
    notes: ['Interfaccia di management integrata via browser', 'Porta 8006 HTTPS, nessun tool separato necessario', 'Gestisce VM, storage, rete, syslog, backup, migrazione'] },
  api: { label: 'REST API', detail: 'pvedaemon + JSON Schema', color: '#7c3aed',
    notes: ['Tutte le operazioni passano attraverso l\'API', 'JSON Schema per integrazione con tool terzi', 'pvesh per accesso CLI diretto all\'API'] },
  pmxcfs: { label: 'pmxcfs', detail: 'Cluster Filesystem', color: '#dc2626',
    notes: ['Database-driven filesystem per configurazioni', 'Replica via Corosync in tempo reale su tutti i nodi', 'Max 30MB — sufficiente per migliaia di VM'] },
  corosync: { label: 'Corosync', detail: 'Cluster communication stack', color: '#dc2626',
    notes: ['Gestisce comunicazione e quorum tra nodi cluster', 'Base per pmxcfs e HA manager', 'Richiede rete a bassa latenza dedicata (consigliato)'] },
  qm: { label: 'qm / KVM', detail: 'Virtual Machine manager', color: '#ea580c',
    notes: ['Gestisce VM QEMU/KVM — virtualizzazione completa', 'Ogni VM ha un processo QEMU dedicato', 'Hardware virtualizzato: CPU, RAM, disco, rete, USB'] },
  pct: { label: 'pct / LXC', detail: 'Container manager', color: '#ea580c',
    notes: ['Gestisce container Linux (LXC)', 'Condivide il kernel host — più leggero delle VM', 'Stesso storage e networking delle VM'] },
  pvesm: { label: 'pvesm', detail: 'Storage Manager', color: '#16a34a',
    notes: ['Gestisce tutti i tipi di storage supportati', 'LVM, ZFS, NFS, Ceph, directory, PBS', 'Ogni storage definisce quali "content type" può contenere'] },
  vmbr: { label: 'vmbr (Bridge)', detail: 'Virtual network bridge', color: '#0891b2',
    notes: ['Switch virtuale che collega VM/CT alla rete fisica', 'Modello bridged: tutte le VM come su stesso switch', 'Supporta VLAN tagging e bonding'] },
  haLrm: { label: 'HA Manager', detail: 'pve-ha-lrm + pve-ha-crm', color: '#9333ea',
    notes: ['Rileva failure nodi con watchdog-based fencing', 'Riavvia automaticamente VM/CT su nodi sani', 'Nessun tool esterno (no Pacemaker necessario)'] },
  firewall: { label: 'Firewall', detail: 'pve-firewall', color: '#be123c',
    notes: ['Filtro packet su VM/CT/nodo/datacenter', 'Security Groups per regole riutilizzabili', '4 livelli di configurazione gerarchici'] },
  pbs: { label: 'Backup (vzdump/PBS)', detail: 'Backup integrato + PBS esterno', color: '#65a30d',
    notes: ['vzdump: backup integrato, snapshot consistente', 'PBS: deduplicazione, incrementali, encryption client-side', 'Formato ottimizzato sparse file + compressione zstd'] },
  permissions: { label: 'Permessi & Auth', detail: 'Role-based ACL', color: '#0d9488',
    notes: ['Realm: PAM, Proxmox auth, LDAP, Active Directory', 'Ruoli predefiniti o custom (set di privilegi)', 'ACL: Utente/Gruppo + Ruolo + Path gerarchico'] },
  sdn: { label: 'SDN', detail: 'Software Defined Network', color: '#c026d3',
    notes: ['Isolamento di rete basato su zone per multi-tenant', 'Supporta VXLAN ed EVPN', 'Integrato in web UI, default da v8.1'] },
};
