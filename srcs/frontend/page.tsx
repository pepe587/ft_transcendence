declare const axios: any;

async function ButtonClicked() {
    console.log('Button clicked');
    try {
        // Redirect the user to the Google OAuth login page
        window.location.href = 'http://localhost:4000/login/google';
    } catch (error) {
        console.error('Redirect error:', error);
    }
}

const googleLoginButton = document.getElementById('google-login') as HTMLButtonElement | null;
googleLoginButton?.addEventListener('click', ButtonClicked);
