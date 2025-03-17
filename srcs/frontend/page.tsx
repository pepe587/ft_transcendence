declare const axios: any;

async function ButtonClicked() {
    console.log('Button clicked');
    try {
        const response = await axios.get('/api/message');
        console.log(response.data.message);
        console.log('Response received');
    } catch (error) {
        console.error(error);
    }
}

const googleLoginButton = document.getElementById('google-login') as HTMLButtonElement | null;
googleLoginButton?.addEventListener('click', ButtonClicked);
