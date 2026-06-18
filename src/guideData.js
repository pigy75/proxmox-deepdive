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
        'Caricare un\'immagine ISO nel datastore Proxmox',
        'Creare la prima VM passo dopo passo (un campo alla volta)',
        'Avviare la VM e installare il sistema operativo',
        'Creare il primo CT (container, più leggero) e fare il primo backup',
      ],
      note: 'Fonte: sequenza verificata su guida pratica StarWind "Creating Your First VM in Proxmox" + documentazione ufficiale.'
    },

    // --- Accesso e upload ISO ---
    {
      type: 'mockup',
      title: 'Passo 1 — Accedi a Proxmox VE',
      mockupKind: 'login',
      caption: 'Apri il browser su https://IP-SERVER:8006 e accedi come "root" con la password impostata in fase di setup.',
    },
    {
      type: 'mockup',
      title: 'Passo 2 — Apri "local (pve)" → ISO Images',
      mockupKind: 'nav-iso',
      caption: 'Nella sidebar, sotto il nodo "pve", seleziona lo storage "local (pve)". Clicca su "ISO Images" nel menu centrale.',
    },
    {
      type: 'mockup',
      title: 'Passo 3 — Clicca "Upload"',
      mockupKind: 'iso-upload-button',
      caption: 'In alto a destra, clicca il pulsante "Upload" per caricare un nuovo file ISO.',
    },
    {
      type: 'mockup',
      title: 'Passo 4 — Seleziona il file e carica',
      mockupKind: 'upload-iso',
      caption: 'Clicca "Select File", scegli l\'ISO dal tuo PC (es. ubuntu-24.04-desktop-amd64.iso), poi clicca "Upload".',
    },
    {
      type: 'mockup',
      title: 'Passo 5 — Upload completato',
      mockupKind: 'task-ok',
      caption: 'Quando il caricamento termina, vedrai il messaggio "TASK OK". L\'ISO è ora disponibile nello storage locale.',
    },

    // --- Creazione VM, un campo alla volta ---
    {
      type: 'mockup',
      title: 'Passo 6 — Clicca "Create VM"',
      mockupKind: 'create-vm-button',
      caption: 'In alto a destra nella web UI, clicca il pulsante blu "Create VM" per aprire il wizard.',
    },
    {
      type: 'mockup',
      title: 'Passo 7 — Assegna un nome alla VM',
      mockupKind: 'vm-general',
      caption: 'Nel tab "General", scrivi un nome per la VM (es. "ubuntu-test"). Il VM ID viene proposto automaticamente — lascialo. Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 8 — Seleziona l\'immagine ISO',
      mockupKind: 'vm-os',
      caption: 'Nel tab "OS", seleziona lo storage dove hai caricato l\'ISO (local) e scegli il file dalla lista. Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 9 — Impostazioni di sistema',
      mockupKind: 'vm-system',
      caption: 'Nel tab "System" puoi lasciare i valori di default, oppure abilitare il "Qemu Agent" (consigliato per VM Linux/Windows moderne). Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 10 — Dimensione del disco',
      mockupKind: 'vm-disk',
      caption: 'Nel tab "Disks", Proxmox propone già una dimensione consigliata (es. 32 GiB). Puoi aumentarla o diminuirla in base alle tue esigenze. Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 11 — Numero di core CPU',
      mockupKind: 'vm-cpu',
      caption: 'Nel tab "CPU", imposta il numero di core (es. 2). Se non sai quale "Type" scegliere, lascia "host". Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 12 — Quantità di RAM',
      mockupKind: 'vm-memory',
      caption: 'Nel tab "Memory", assegna la RAM (es. 2048 MiB = 2GB). Assicurati di lasciarne a sufficienza anche per l\'host. Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 13 — Impostazioni di rete',
      mockupKind: 'vm-network',
      caption: 'Nel tab "Network", puoi lasciare le impostazioni di default (bridge vmbr0, modello VirtIO). Clicca "Next".',
    },
    {
      type: 'mockup',
      title: 'Passo 14 — Riepilogo e conferma',
      mockupKind: 'vm-confirm',
      caption: 'Controlla il riepilogo di tutte le impostazioni scelte. Clicca "Finish" per creare la VM (non spuntiamo ancora "Start" — la avvieremo al passo successivo).',
    },

    // --- Avvio e installazione OS ---
    {
      type: 'mockup',
      title: 'Passo 15 — Apri la Console e avvia',
      mockupKind: 'vm-console-start',
      caption: 'Seleziona la VM dalla sidebar, vai sul tab "Console", poi clicca "Start Now" per avviare la macchina virtuale.',
    },
    {
      type: 'mockup',
      title: 'Passo 16 — Premi Invio per iniziare l\'installazione',
      mockupKind: 'os-boot',
      caption: 'Al primo avvio dall\'ISO, premi "Enter" sulla voce di installazione per cominciare la procedura guidata del sistema operativo.',
    },
    {
      type: 'mockup',
      title: 'Passo 17 — Scegli lingua e tastiera',
      mockupKind: 'os-language',
      caption: 'Segui l\'installer del sistema operativo: lingua, layout di tastiera, tipo di installazione (interattiva è la scelta più semplice per iniziare).',
    },
    {
      type: 'mockup',
      title: 'Passo 18 — Partizionamento disco',
      mockupKind: 'os-disk',
      caption: 'Scegli "Erase disk and install" per una installazione pulita sul disco virtuale che hai creato (è un disco virtuale, non tocca l\'host).',
    },
    {
      type: 'mockup',
      title: 'Passo 19 — Crea l\'account utente',
      mockupKind: 'os-account',
      caption: 'Inserisci nome utente e una password sicura per il sistema operativo che stai installando.',
    },
    {
      type: 'mockup',
      title: 'Passo 20 — Installazione e riavvio',
      mockupKind: 'os-install-done',
      caption: 'Conferma e attendi il completamento dell\'installazione, poi clicca "Restart Now". La tua prima VM è pronta e funzionante!',
    },

    // --- Container e backup ---
    {
      type: 'mockup',
      title: 'Passo 21 — Crea un Container (alternativa più leggera)',
      mockupKind: 'create-ct-button',
      caption: 'Pulsante "Create CT" in alto. Stesso principio della VM ma più leggero: condivide il kernel con l\'host, usa un "template" invece di una ISO completa.',
    },
    {
      type: 'mockup',
      title: 'Passo 22 — Primo Backup',
      mockupKind: 'backup',
      caption: 'Seleziona la VM/CT → Backup → "Backup now". Scegli lo storage di destinazione e la modalità "Snapshot" (nessun downtime).',
    },
    {
      type: 'info',
      title: 'Utilizzo Base completato ✅',
      bullets: [
        'Hai caricato un\'ISO e creato la tua prima VM, campo per campo',
        'Hai installato un sistema operativo completo dentro la VM',
        'Sai come creare un container più leggero',
        'Hai fatto il primo backup di sicurezza',
        'Prossimo livello: Configurazione Avanzata (cluster, HA, PBS)',
      ],
    },
  ],
};
