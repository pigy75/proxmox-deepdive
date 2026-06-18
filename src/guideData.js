// Guida pratica step-by-step — slide stile presentazione
// Fonte: Proxmox VE Installation guide (pve.proxmox.com/wiki/Installation) + Quick installation wiki
// type: 'info' (slide solo testo/concetto) | 'mockup' (slide con interfaccia simulata)

export const guideSections = [
  { id: 'setup', label: '1. Setup', icon: '🛠️' },
  { id: 'config-base', label: '2. Configurazione Base', icon: '⚙️' },
  { id: 'utilizzo-base', label: '3. Utilizzo Base', icon: '🖥️' },
  { id: 'operazioni-comuni', label: '4. Operazioni Comuni', icon: '🔨' },
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
      type: 'screenshot',
      title: 'Passo 1 — Accedi a Proxmox VE',
      img: '/screenshots/step-login.png',
      caption: 'Apri il browser su https://IP-SERVER:8006. Inserisci "root" come User name e la password impostata durante il setup. Clicca "Login".',
    },
    {
      type: 'screenshot',
      title: 'Passo 2 — Seleziona "local (pve)" → ISO Images → Upload',
      img: '/screenshots/step-nav-iso.png',
      caption: 'Nella sidebar: ① clicca "pve", ② clicca "local (pve)", ③ clicca "ISO Images", ④ clicca "Upload".',
    },
    {
      type: 'screenshot',
      title: 'Passo 3 — Seleziona il file ISO e carica',
      img: '/screenshots/step-upload-select.png',
      caption: 'Clicca "Select File" e scegli l\'ISO dal tuo PC (es. ubuntu-24.04.2-desktop-amd64.iso). Poi clicca "Upload".',
    },
    {
      type: 'screenshot',
      title: 'Passo 4 — Upload completato: TASK OK',
      img: '/screenshots/step-task-ok.png',
      caption: 'Quando appare "finished file import successfully" e "TASK OK", l\'ISO è disponibile nello storage Proxmox.',
    },
    {
      type: 'screenshot',
      title: 'Passo 5 — ISO visibile nella lista',
      img: '/screenshots/step-iso-list.png',
      caption: 'Ora l\'ISO compare nella lista. Siamo pronti per creare la VM. Clicca "Create VM" in alto a destra.',
    },

    // --- Creazione VM, un campo alla volta ---
    {
      type: 'screenshot',
      title: 'Passo 6 — Clicca "Create VM"',
      img: '/screenshots/step-create-vm.png',
      caption: 'Il pulsante "Create VM" si trova in alto a destra. Cliccalo per aprire il wizard di creazione.',
    },
    {
      type: 'screenshot',
      title: 'Passo 7 — General: assegna un nome alla VM',
      img: '/screenshots/step-vm-general.png',
      caption: 'Scrivi un nome per la VM (es. "karim"). Il VM ID viene proposto automaticamente (es. 100) — lascialo. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 8 — OS: seleziona l\'immagine ISO',
      img: '/screenshots/step-vm-os.png',
      caption: 'Seleziona lo storage "local" e scegli il file ISO dalla lista (es. ubuntu-24.04.2-desktop-amd64.iso). Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 9 — System: abilita Qemu Agent',
      img: '/screenshots/step-vm-system.png',
      caption: 'Spunta "Qemu Agent" (consigliato: permette a Proxmox di comunicare con la VM per IP, shutdown pulito, ecc.). Lascia il resto di default. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 10 — Disks: dimensione disco',
      img: '/screenshots/step-vm-disk.png',
      caption: 'Proxmox propone 32 GiB come default. Puoi aumentarlo se necessario. Lo storage "local-lvm" è quello corretto per VM. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 11 — CPU: tipo e core',
      img: '/screenshots/step-vm-cpu.png',
      caption: 'Imposta 1 socket, 1 core (o 2 se hai risorse). Per il "Type" usa "host" — è la scelta più efficiente. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 12 — Memory: quantità di RAM',
      img: '/screenshots/step-vm-memory.png',
      caption: 'Assegna 2048 MiB (2 GB). Per Ubuntu Desktop servono almeno 2GB; per server 1GB può bastare. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 13 — Network: impostazioni rete',
      img: '/screenshots/step-vm-network.png',
      caption: 'Lascia il bridge "vmbr0" e il modello "VirtIO (paravirtualized)" — sono i valori ottimali. Clicca "Next".',
    },
    {
      type: 'screenshot',
      title: 'Passo 14 — Confirm: riepilogo e conferma',
      img: '/screenshots/step-vm-confirm.png',
      caption: 'Controlla il riepilogo. Clicca "Finish" per creare la VM. La avvieremo manualmente al passo successivo.',
    },

    // --- Avvio e installazione OS ---
    {
      type: 'screenshot',
      title: 'Passo 15 — Console: avvia la VM',
      img: '/screenshots/step-vm-console-start.png',
      caption: 'Seleziona la VM dalla sidebar (es. "100 (karim)"), vai su "Console" e clicca "Start Now". La VM si avvierà dall\'ISO.',
    },
    {
      type: 'screenshot',
      title: 'Passo 16 — Seleziona "Try or Install Ubuntu"',
      img: '/screenshots/step-os-boot.png',
      caption: 'Nella schermata GRUB, la prima voce "Try or Install Ubuntu" è già selezionata. Premi Invio (oppure aspetta il timeout).',
    },
    {
      type: 'screenshot',
      title: 'Passo 17 — Scegli la lingua',
      img: '/screenshots/step-os-language.png',
      caption: 'Seleziona la lingua desiderata (es. "English" o "Italiano") e clicca "Next" per continuare l\'installazione.',
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

  // ─── 4. OPERAZIONI COMUNI ────────────────────────────────────────────────
  // Fonte: edywerder.ch/increase-vm-disk-in-proxmox/ + doc ufficiale Proxmox VE
  'operazioni-comuni': [
    {
      type: 'info',
      title: 'Operazione: Espandere il disco di una VM',
      bullets: [
        'Il disco virtuale in Proxmox è come un hard disk fisico — puoi ingrandirlo senza perdere dati',
        'Il processo ha due fasi: prima si espande il disco in Proxmox (GUI), poi si estende la partizione nel sistema operativo guest',
        'IMPORTANTE: Proxmox non supporta la riduzione dei dischi — solo espansione',
        'Fai sempre un backup prima di modificare dischi',
      ],
      note: '⚠️ Shrinking (ridurre) un disco non è supportato da Proxmox VE — richiede operazioni manuali rischiose. Non provarci senza backup e senza esperienza.'
    },

    // --- PARTE 1: Proxmox GUI ---
    {
      type: 'mockup',
      title: 'Passo 1 — Vai su Hardware della VM',
      mockupKind: 'resize-hardware',
      caption: 'Seleziona la VM nella sidebar → clicca "Hardware" nel menu centrale. Vedrai la lista di tutti i componenti virtuali.',
    },
    {
      type: 'mockup',
      title: 'Passo 2 — Seleziona il disco e clicca "Disk Action"',
      mockupKind: 'resize-select-disk',
      caption: 'Clicca sul disco da espandere (es. "scsi0" o "virtio0"), poi clicca il pulsante "Disk Action" in alto → scegli "Resize".',
    },
    {
      type: 'mockup',
      title: 'Passo 3 — Inserisci il valore di incremento',
      mockupKind: 'resize-dialog',
      caption: 'Nel dialog "Resize disk", inserisci quanti GiB vuoi AGGIUNGERE (non la dimensione totale). Es: se il disco era 32GB e vuoi portarlo a 50GB, scrivi "18". Clicca "Resize disk".',
      warn: 'Il valore è un incremento, non la dimensione finale. Es: "+18" non "50".'
    },
    {
      type: 'info',
      title: 'Dopo il resize in Proxmox — cosa succede?',
      bullets: [
        'Proxmox ha espanso il disco virtuale — il "contenitore" è più grande',
        'Ma il sistema operativo guest non lo sa ancora — la partizione occupa ancora lo spazio precedente',
        'Devi ora entrare nel guest (Linux o Windows) e estendere la partizione per usare lo spazio nuovo',
      ],
      note: '💡 Puoi fare il resize con la VM accesa (live resize) — non è necessario spegnerla per Linux moderni.'
    },

    // --- PARTE 2: Linux ---
    {
      type: 'info',
      title: 'Estendere la partizione su Linux (Ubuntu)',
      bullets: [
        'Ubuntu 24.04 usa una partizione root singola (/) con swap file — struttura semplice',
        'Strumenti da terminale: lsblk (verifica), growpart (estendi partizione), resize2fs (estendi filesystem)',
        'Alternativa grafica: GParted Live ISO (avvia la VM da ISO GParted, tutto a click)',
      ],
      note: 'I comandi sotto richiedono sudo — sono gli unici passaggi CLI necessari in questa guida.'
    },
    {
      type: 'code',
      title: 'Linux — Passo 1: verifica il disco con lsblk',
      code: `# Verifica che il nuovo spazio sia visibile
lsblk

# Output atteso (esempio):
# NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
# sda      8:0    0   50G  0 disk          ← disco ora 50GB
# └─sda1   8:1    0   32G  0 part /        ← partizione ancora 32GB`,
      caption: 'Il disco mostra già 50GB ma la partizione è rimasta a 32GB — questo è normale. Dobbiamo estenderla.',
    },
    {
      type: 'code',
      title: 'Linux — Passo 2: estendi la partizione con growpart',
      code: `# Installa growpart se non presente
sudo apt install cloud-guest-utils -y

# Estendi la partizione 1 del disco sda
sudo growpart /dev/sda 1

# Verifica
lsblk
# sda1 ora mostra 50GB`,
      caption: 'growpart espande la partizione per occupare tutto lo spazio disponibile sul disco. Sicuro con la VM accesa.',
    },
    {
      type: 'code',
      title: 'Linux — Passo 3: estendi il filesystem con resize2fs',
      code: `# Per filesystem ext4 (il più comune su Ubuntu):
sudo resize2fs /dev/sda1

# Verifica spazio disponibile
df -h /

# Output atteso:
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda1        49G  8.2G   39G  18% /  ← ora 49GB disponibili`,
      caption: 'resize2fs adatta il filesystem alla nuova dimensione della partizione. Al termine il sistema operativo vede tutto lo spazio.',
    },
    {
      type: 'info',
      title: 'Linux — Alternativa grafica: GParted',
      bullets: [
        '1. Scarica GParted Live ISO da gparted.org',
        '2. Caricala in Proxmox (local → ISO Images → Upload)',
        '3. Nella VM: Hardware → CD/DVD → scegli GParted ISO',
        '4. Opzioni VM → Boot Order → metti CD/DVD prima del disco',
        '5. Avvia la VM — si carica GParted con interfaccia grafica',
        '6. Trascina la partizione per espanderla, clicca Apply',
        '7. Rimuovi l\'ISO e ripristina boot order sul disco',
      ],
      note: '💡 GParted è la scelta migliore se non sei a tuo agio con il terminale, o se devi ridimensionare la partizione di boot.'
    },

    // --- PARTE 3: Windows ---
    {
      type: 'info',
      title: 'Estendere il disco su Windows — Disk Management',
      bullets: [
        'Windows rileva automaticamente il nuovo spazio non allocato',
        'Si gestisce tutto via GUI: Disk Management (Gestione disco)',
        'Nota: in una VM Windows appena installata ci sono partizioni di sistema prima della C: — questo può impedire l\'espansione diretta',
      ],
    },
    {
      type: 'mockup',
      title: 'Windows — Passo 1: apri Disk Management',
      mockupKind: 'win-diskmanagement',
      caption: 'Click destro su Start → "Disk Management" (Gestione disco). Vedrai il disco con lo spazio non allocato (Unallocated) alla fine.',
    },
    {
      type: 'mockup',
      title: 'Windows — Passo 2: Estendi il volume (C:)',
      mockupKind: 'win-extend',
      caption: 'Click destro sulla partizione C: → "Extend Volume..." → segui il wizard → clicca Finish. Windows usa automaticamente tutto lo spazio disponibile.',
      warn: 'Se "Extend Volume" è grigio, c\'è una partizione di recovery tra C: e lo spazio libero. Soluzione: aggiungi un disco separato per i dati, oppure usa GParted per riorganizzare le partizioni.'
    },

    // --- PARTE 4: Aggiungere un disco nuovo ---
    {
      type: 'info',
      title: 'Alternativa: aggiungere un disco nuovo invece di espandere',
      bullets: [
        'Invece di espandere il disco esistente, puoi aggiungere un secondo disco virtuale alla VM',
        'Vantaggio: zero rischi, zero comandi — il disco esistente rimane intatto',
        'Quando usarlo: per dati separati (es. D: su Windows, /mnt/dati su Linux)',
      ],
    },
    {
      type: 'mockup',
      title: 'Aggiungere un disco: Hardware → Add → Hard Disk',
      mockupKind: 'add-disk',
      caption: 'VM → Hardware → "Add" → "Hard Disk". Scegli storage, dimensione e tipo bus (SCSI/VirtIO). Il nuovo disco sarà visibile nel guest dopo il riavvio come disco non inizializzato.',
    },
    {
      type: 'info',
      title: 'Operazione completata ✅',
      bullets: [
        'Proxmox: resize via Hardware → Disk Action → Resize (incremento in GiB)',
        'Linux: growpart + resize2fs, oppure GParted Live ISO per chi preferisce la GUI',
        'Windows: Disk Management → Extend Volume, oppure disco aggiuntivo separato',
        'Regola d\'oro: backup prima, poi resize — mai il contrario',
      ],
    },
  ],
};
