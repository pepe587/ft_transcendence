const { access } = require("fs");

module.exports = async function (app) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const googleRedirectUri = process.env.GOOGLE_CLIENT_REDIRECT;

  let access_token;
  let loggedIn = new Map();

  app.get("/google", (req, reply) => {
    console.log("OAuth request received");
    reply.redirect(
      `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=profile email`
    );
  });

  app.get("/callback", async (req, res) => {
    console.log(`\n-------------------------------`);
    console.log("\nHandling OAuth2 callback...");
    let code = req.query.code;

    try {
      const response = await app.inject({
        method: "POST",
        url: "https://oauth2.googleapis.com/token",
        payload: {
          client_id: googleClientId,
          client_secret: googleClientSecret,
          redirect_uri: googleRedirectUri,
          code: code,
          grant_type: "authorization_code",
        },
      });

      const responseBody = JSON.parse(response.body);
      access_token = responseBody.access_token;
      console.log(`✅ Access token received\n`);
      console.log(responseBody);
      console.log(`Access Token: ${access_token}`);
      console.log(`\n-------------------------------\n`);

      loggedIn.set(code, true);

      const frontendHost =
      req.headers["x-forwarded-host"] ||
      req.headers.host ||
      "localhost";

      const redirectUrl = new URL(`https://${frontendHost}:8443`);
      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error("❌ Error during callback handling:", error);
      res.send("An error occurred");
    }
  });
};
