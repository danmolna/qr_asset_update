const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Fő ablak létrehozása
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false // Engedélyezi a helyi fájlok hozzáférését
        },
        icon: path.join(__dirname, 'assets', 'icon.png'), // Ha van ikon
        show: false // Eleinte rejtett, majd megjelenítjük amikor készen van
    });

    // Renderer oldal betöltése
    mainWindow.loadFile('renderer/index.html');

    // Fejlesztői eszközök megnyitása fejlesztés közben
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    // Ablak megjelenítése amikor készen van
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Fókusz a főablakra
        if (mainWindow) {
            mainWindow.focus();
        }
    });

    // Ablak bezárásakor
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Külső linkek alapértelmezett böngészőben nyitása
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        require('electron').shell.openExternal(url);
        return { action: 'deny' };
    });
}

// Alkalmazás indításakor
app.whenReady().then(() => {
    createWindow();

    // macOS - új ablak nyitása ha nincs nyitva
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Kilépés amikor minden ablak bezárult (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Egyszerű menü létrehozása
app.whenReady().then(() => {
    const template = [
        {
            label: 'Fájl',
            submenu: [
                {
                    label: 'Kilépés',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Nézet',
            submenu: [
                {
                    label: 'Újratöltés',
                    accelerator: 'F5',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.reload();
                        }
                    }
                },
                {
                    label: 'Fejlesztői eszközök',
                    accelerator: 'F12',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.webContents.toggleDevTools();
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Nagyítás',
                    accelerator: 'CmdOrCtrl+Plus',
                    click: () => {
                        if (mainWindow) {
                            const zoomLevel = mainWindow.webContents.getZoomLevel();
                            mainWindow.webContents.setZoomLevel(zoomLevel + 0.5);
                        }
                    }
                },
                {
                    label: 'Kicsinyítés',
                    accelerator: 'CmdOrCtrl+-',
                    click: () => {
                        if (mainWindow) {
                            const zoomLevel = mainWindow.webContents.getZoomLevel();
                            mainWindow.webContents.setZoomLevel(zoomLevel - 0.5);
                        }
                    }
                },
                {
                    label: 'Eredeti méret',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.webContents.setZoomLevel(0);
                        }
                    }
                }
            ]
        },
        {
            label: 'Súgó',
            submenu: [
                {
                    label: 'Névjegy',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'QR Asset Scanner',
                            message: 'QR Asset Scanner v1.0.0',
                            detail: 'QR kód alapú géplista szkennelő alkalmazás\n\nKészítette: danmolna',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});