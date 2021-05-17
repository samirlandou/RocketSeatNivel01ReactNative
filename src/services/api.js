import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;

/**
 * ios com Emulador: localhost
 * ios com físico: IP da máquina
 * 
 * Android com Emulador: localhost (adb reverse tcp:3333 tcp:3333)
 *  redireciona a porta 3333 do maquina para a porta 3333 do emulador
 *  que é aqui uma maquina virtual;
 * Android com Emulador: 10.0.2.2 (Android Studio)
 * Android com Emulador: 10.0.3.2 (Genymotion)
 * Android com físico: IP da máquina
 */