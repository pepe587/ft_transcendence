declare const axios: any;

async function isUserLoggedIn() {
    try {
        const response = await fetch('http://localhost:4000/api/loggedin');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.loggedIn;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function googleSignIn() {
    console.log('Button clicked');
    try {
        // Redirect the user to the Google OAuth login page
        window.location.href = 'http://localhost:4000/api/oauth';
    } catch (error) {
        console.error('Redirect error:', error);
    }
    if (await isUserLoggedIn()) {
        const mainPage = document.getElementsByClassName('mainpage')[0] as HTMLDivElement | null;
        const loginPage = document.getElementsByClassName('login')[0] as HTMLDivElement | null;

        if (mainPage) {
            mainPage.style.display = 'flex';
        }
        if (loginPage) {
            loginPage.style.display = 'none';
        }
    }
}

const googleLoginButton = document.getElementById('google-login') as HTMLButtonElement | null;
googleLoginButton?.addEventListener('click', googleSignIn);
