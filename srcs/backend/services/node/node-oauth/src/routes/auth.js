module.exports = async function (app) {
    const googleClientId = process.env.GCLIENT_ID;
    const googleClientSecret = process.env.CLIENT_SECRET;
    const googleRedirectUri = process.env.RDIR_URI;

    let access_token;
    let loggedIn = new Map();

    app.get('/api/oauth', (req, reply) => {
        console.log('OAuth request received');
        reply.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=profile email`);
    });

    app.get('/api/callback', async (req, res) => {
        console.log("\nHandling OAuth2 callback...");
        let code = req.query.code;

        try {
            const response = await app.inject({
                method: 'POST',
                url: 'https://oauth2.googleapis.com/token',
                payload: {
                    client_id: googleClientId,
                    client_secret: googleClientSecret,
                    redirect_uri: googleRedirectUri,
                    code: code,
                    grant_type: 'authorization_code'
                }
            });

            const responseBody = JSON.parse(response.body);
            access_token = responseBody.access_token;
            console.log(`✅ Access token received`);

            loggedIn.set(code, true);

            res.redirect('https://localhost:8443');
        } catch (error) {
            console.error('❌ Error during callback handling:', error);
            res.send('An error occurred');
        }
    });
};
