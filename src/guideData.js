// Guida pratica step-by-step — slide stile presentazione
// Fonte: Proxmox VE Installation guide (pve.proxmox.com/wiki/Installation) + Quick installation wiki
// type: 'info' (slide solo testo/concetto) | 'mockup' (slide con interfaccia simulata)

export const guideSections = [
  { id: 'setup', label: '1. Setup', icon: '🛠️' },
  { id: 'config-base', label: '2. Configurazione Base', icon: '⚙️' },
  { id: 'utilizzo-base', label: '3. Utilizzo Base', icon: '🖥️' },
];

export const guideSlides = {

  setup: [
    {
      type: 'info',
      title: 'Cosa serve prima di iniziare',
      bullets: [
        'Una USB da almeno 1GB (verrà cancellata completamente)',
        'Il file ISO di Proxmox VE scaricato da proxmox.com/downloads',
        'Un PC o server dedicato — l\'installer userà TUTTO il disco selezionato',
        'Un cavo di rete collegato (servirà per la configurazione)',
      ],
      note: 'Niente CLI in questa fase: tutto il setup iniziale è grafico (installer ISO).'
    },
    {
      type: 'mockup',
      title: 'Passo 1 — Scrivi la USB con Rufus (o Etcher)',
      mockupKind: 'rufus',
      caption: 'Apri Rufus, seleziona la tua USB come "Device" e il file ISO Proxmox come immagine. Clicca START.',
      warn: 'Tutti i dati sulla USB verranno cancellati.'
    },
    {
      type: 'mockup',
      title: 'Passo 2 — Avvia dalla USB',
      mockupKind: 'boot',
      caption: 'Inserisci la USB nel server, accendilo e apri il boot menu (di solito F11/F12/ESC a seconda della scheda madre). Seleziona la USB Proxmox.',
    },
    {
      type: 'mockup',
      title: 'Passo 3 — Schermata iniziale installer',
      mockupKind: 'installer-menu',
      caption: 'Seleziona "Install Proxmox VE (Graphical)" — la prima voce — e premi Invio.',
    },
    {
      type: 'mockup',
      title: 'Passo 4 — Accetta la licenza (EULA)',
      mockupKind: 'eula',
      caption: 'Leggi e clicca "I agree" per proseguire.',
    },
    {
      type: 'mockup',
      title: 'Passo 5 — Scegli il disco di destinazione',
      mockupKind: 'disk-select',
      caption: 'Seleziona il disco su cui installare Proxmox. ATTENZIONE: questo disco verrà formattato completamente.',
      warn: 'Tutti i dati sul disco selezionato verranno persi.'
    },
    {
      type: 'mockup',
      title: 'Passo 6 — Paese, fuso orario, tastiera',
      mockupKind: 'locale',
      caption: 'Seleziona il tuo Paese (es. Italy), il fuso orario (Europe/Rome) e il layout tastiera (Italian).',
    },
    {
      type: 'mockup',
      title: 'Passo 7 — Password root ed email',
      mockupKind: 'password',
      caption: 'Imposta una password sicura per l\'utente root (amministratore) e un indirizzo email per le notifiche di sistema.',
    },
    {
      type: 'mockup',
      title: 'Passo 8 — Configurazione di rete',
      mockupKind: 'network',
      caption: 'Imposta hostname (es. pve.tuodominio.local), indirizzo IP statico, gateway e DNS. Se hai più schede di rete, scegli quella collegata.',
    },
    {
      type: 'mockup',
      title: 'Passo 9 — Riepilogo e installazione',
      mockupKind: 'summary',
      caption: 'Controlla tutti i parametri inseriti e clicca "Install". L\'installazione richiede 5-10 minuti.',
    },
    {
      type: 'mockup',
      title: 'Passo 10 — Riavvio e primo accesso',
      mockupKind: 'reboot',
      caption: 'Al termine, rimuovi la USB e clicca Reboot. La console mostrerà l\'indirizzo per accedere via browser.',
    },
    {
      type: 'mockup',
      title: 'Passo 11 — Login alla Web UI',
      mockupKind: 'login',
      caption: 'Da un altro PC, apri il browser su https://IP-DEL-SERVER:8006 (vedrai un avviso di certificato non sicuro: è normale, procedi). Accedi con root e la password impostata.',
    },
    {
      type: 'info',
      title: 'Setup completato ✅',
      bullets: [
        'Proxmox VE è installato e raggiungibile via web',
        'Hai già un nodo singolo pronto all\'uso',
        'Prossimo passo: configurazione base (storage, rete, permessi)',
      ],
    },
  ],

  'config-base': [
    {
      type: 'info',
      title: 'Cosa configuriamo in questa fase',
      bullets: [
        'Storage: dove salveremo VM, container e backup',
        'Rete: bridge per collegare le VM alla rete fisica',
        'Utenti e permessi (opzionale per uso singolo, utile in team)',
      ],
      note: 'Tutto via GUI — nessun comando da terminale necessario.'
    },
    {
      type: 'mockup',
      title: 'Passo 1 — Vai su Datacenter',
      mockupKind: 'nav-datacenter',
      caption: 'Nella sidebar a sinistra clicca su "Datacenter" (la voce più in alto).',
    },
    {
      type: 'mockup',
      title: 'Passo 2 — Apri la sezione Storage',
      mockupKind: 'nav-storage',
      caption: 'Nel menu centrale clicca su "Storage", poi sul pulsante "Add" in alto a destra.',
    },
    {
      type: 'mockup',
      title: 'Passo 3 — Aggiungi uno storage',
      mockupKind: 'add-storage',
      caption: 'Scegli il tipo (es. "Directory" per iniziare in modo semplice), assegna un nome e seleziona il percorso. Spunta i "Content" che vuoi salvare lì (Disk image, ISO, Backup).',
    },
    {
      type: 'mockup',
      title: 'Passo 4 — Verifica rete: il bridge vmbr0',
      mockupKind: 'nav-network',
      caption: 'Vai su nodo (es. "pve") → System → Network. Vedrai già "vmbr0" creato automaticamente durante l\'installazione: è il bridge che collega le VM alla tua rete fisica.',
    },
    {
      type: 'mockup',
      title: 'Passo 5 — (Opzionale) Crea un utente',
      mockupKind: 'add-user',
      caption: 'Datacenter → Permissions → Users → Add. Utile se non vuoi usare sempre l\'account root per il lavoro quotidiano.',
    },
    {
      type: 'info',
      title: 'Configurazione Base completata ✅',
      bullets: [
        'Hai uno storage pronto per VM, ISO e backup',
        'La rete (vmbr0) è già funzionante di default',
        'Sei pronto per creare la prima VM o container',
      ],
    },
  ],

  'utilizzo-base': [
    {
      type: 'info',
      title: 'Cosa faremo in questa fase',
      bullets: [
        'Creare la prima VM (macchina virtuale)',
        'Creare il primo CT (container, più leggero)',
        'Fare il primo backup',
      ],
    },
    {
      type: 'mockup',
      title: 'Passo 1 — Carica un\'immagine ISO',
      mockupKind: 'upload-iso',
      caption: 'Seleziona lo storage (es. "local") → ISO Images → Upload. Carica l\'ISO del sistema che vuoi installare (es. Ubuntu Server).',
    },
    {
      type: 'mockup',
      title: 'Passo 2 — Crea VM: pulsante "Create VM"',
      mockupKind: 'create-vm-button',
      caption: 'In alto a destra nella web UI, clicca il pulsante blu "Create VM".',
    },
    {
      type: 'mockup',
      title: 'Passo 3 — Wizard VM: General',
      mockupKind: 'vm-general',
      caption: 'Assegna un nome alla VM (es. "ubuntu-test"). Il VM ID viene proposto automaticamente.',
    },
    {
      type: 'mockup',
      title: 'Passo 4 — Wizard VM: OS',
      mockupKind: 'vm-os',
      caption: 'Seleziona lo storage dove hai caricato l\'ISO e scegli il file ISO dalla lista.',
    },
    {
      type: 'mockup',
      title: 'Passo 5 — Wizard VM: System / Disks / CPU / Memory',
      mockupKind: 'vm-resources',
      caption: 'Avanza con "Next" attraverso le schermate System, Disks, CPU e Memory — i valori di default vanno bene per iniziare (es. 2 CPU, 2GB RAM, 32GB disco).',
    },
    {
      type: 'mockup',
      title: 'Passo 6 — Conferma e avvia',
      mockupKind: 'vm-confirm',
      caption: 'Nella schermata di riepilogo, spunta "Start after created" e clicca "Finish". La VM si avvierà subito.',
    },
    {
      type: 'mockup',
      title: 'Passo 7 — Accedi alla console',
      mockupKind: 'vm-console',
      caption: 'Seleziona la VM dalla sidebar e clicca ">_ Console" per accedere allo schermo virtuale e procedere con l\'installazione del sistema operativo.',
    },
    {
      type: 'mockup',
      title: 'Passo 8 — Crea un Container (alternativa leggera)',
      mockupKind: 'create-ct-button',
      caption: 'Pulsante "Create CT" in alto. Stesso principio della VM ma più leggero: condivide il kernel con l\'host, usa un "template" invece di una ISO completa.',
    },
    {
      type: 'mockup',
      title: 'Passo 9 — Primo Backup',
      mockupKind: 'backup',
      caption: 'Seleziona la VM/CT → Backup → "Backup now". Scegli lo storage di destinazione e la modalità "Snapshot" (nessun downtime).',
    },
    {
      type: 'info',
      title: 'Utilizzo Base completato ✅',
      bullets: [
        'Hai creato e avviato la tua prima VM',
        'Sai come creare un container più leggero',
        'Hai fatto il primo backup di sicurezza',
        'Prossimo livello: Configurazione Avanzata (cluster, HA, PBS)',
      ],
    },
  ],
};
