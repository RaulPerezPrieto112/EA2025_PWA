
// service worker

if ('serviceWorker' in navigator) {
    console.log('si tiene sw');
    navigator.serviceWorker.register('/sw.js')
        .then(res => console.log('serviceWorker cargado correctamente', res))
        .catch(err => console.log('serviceWorker no se pudo registrar', err));
} else {
    console.log('no se localiza');
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e; 
    console.log('Evento beforeinstallprompt disparado');

    const installButton = document.createElement('button');
    installButton.textContent = 'Instalar PWA';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '20px';
    installButton.style.right = '20px';
    installButton.style.padding = '10px';
    installButton.style.zIndex = '1000';
    document.body.appendChild(installButton);

    installButton.addEventListener('click', async () => {
        deferredPrompt.prompt(); // Muestra el cuadro de instalación
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Resultado de la instalación: ${outcome}`);
        deferredPrompt = null;
    });
});


// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
//   console.log('beforeinstallprompt disparado');

//   // Mostrar un botón personalizado
//   const installButton = document.createElement('button');
//   installButton.textContent = 'Instalar PWA';
//   document.body.appendChild(installButton);

//   installButton.addEventListener('click', async () => {
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log(`Resultado de la instalación: ${outcome}`);
//     deferredPrompt = null;
//   });
// });
