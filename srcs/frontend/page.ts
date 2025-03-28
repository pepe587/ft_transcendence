declare const axios: any;

async function googleSignIn() {
    console.log('Button clicked');
    try {
        // Redirect the user to the Google OAuth login page
        window.location.href = 'http://localhost:4000/api/oauth';
    } catch (error) {
        console.error('Redirect error:', error);
    }
}

const googleLoginButton = document.getElementById('google-login') as HTMLButtonElement | null;
googleLoginButton?.addEventListener('click', googleSignIn);
const socket = new WebSocket('ws://localhost:4000/ws');

socket.onmessage = (event) => {
    console.log('Mensaje recibido:', event.data);
    const isLoggedIn = JSON.parse(event.data);
    if (isLoggedIn) {
        const mainPage = document.getElementsByClassName('mainpage')[0] as HTMLDivElement | null;
        const loginPage = document.getElementsByClassName('login')[0] as HTMLDivElement | null;

        if (mainPage) {
            mainPage.style.display = 'flex';
        }
        if (loginPage) {
            loginPage.style.display = 'none';
        }
    }
    else if (!isLoggedIn) {
        const mainPage = document.getElementsByClassName('mainpage')[0] as HTMLDivElement | null;
        const loginPage = document.getElementsByClassName('login')[0] as HTMLDivElement | null;

        if (mainPage) {
            mainPage.style.display = 'none';
        }
        if (loginPage) {
            loginPage.style.display = 'flex';
        }
    }
};

socket.onopen = () => {
    console.log('Conectado al WebSocket');
};

socket.onerror = (error) => {
    console.error('Error en WebSocket:', error);
};
