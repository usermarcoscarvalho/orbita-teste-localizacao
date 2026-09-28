// Projeto isolado de teste - nao faz parte do sistema Orbita.
// Objetivo unico: provar se um app nativo (empacotado com Capacitor) consegue
// continuar mandando localizacao com o app em segundo plano / tela travada no
// iPhone, o que um PWA (web app) nao consegue fazer no iOS.
import { BackgroundGeolocation } from '@capgo/background-geolocation';

const STORAGE_KEY = 'orbita_teste_pings';

function loadPings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function savePing(ping) {
  const pings = loadPings();
  pings.push(ping);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pings));
  render();
}

function render() {
  const pings = loadPings();
  document.getElementById('count').textContent = pings.length;
  document.getElementById('log').innerHTML = pings
    .slice()
    .reverse()
    .map((p) => `<li>${p.time} — lat ${p.lat.toFixed(5)}, lon ${p.lon.toFixed(5)}</li>`)
    .join('');
}

document.getElementById('start').addEventListener('click', async () => {
  document.getElementById('status').textContent =
    'Rastreando... pode travar a tela e guardar o celular no bolso. Ande um pouco de tempos em tempos pra gerar pontos novos.';
  try {
    await BackgroundGeolocation.start(
      {
        backgroundTitle: 'Orbita — teste de localizacao',
        backgroundMessage: 'Testando localizacao em segundo plano.',
        requestPermissions: true,
        stale: false,
        distanceFilter: 10,
      },
      (location, error) => {
        if (error) {
          document.getElementById('status').textContent = 'Erro: ' + JSON.stringify(error);
          return;
        }
        if (location) {
          savePing({
            time: new Date().toLocaleTimeString('pt-BR'),
            lat: location.latitude,
            lon: location.longitude,
          });
        }
      }
    );
  } catch (err) {
    document.getElementById('status').textContent = 'Falha ao iniciar: ' + err.message;
  }
});

document.getElementById('stop').addEventListener('click', async () => {
  await BackgroundGeolocation.stop();
  document.getElementById('status').textContent = 'Parado.';
});

document.getElementById('clear').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();
