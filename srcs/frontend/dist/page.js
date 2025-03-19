"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function isUserLoggedIn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:4000/api/loggedin');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            return data.loggedIn;
        }
        catch (error) {
            console.error('Fetch error:', error);
        }
    });
}
function googleSignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Button clicked');
        try {
            // Redirect the user to the Google OAuth login page
            window.location.href = 'http://localhost:4000/api/oauth';
        }
        catch (error) {
            console.error('Redirect error:', error);
        }
        if (yield isUserLoggedIn()) {
            const mainPage = document.getElementsByClassName('mainpage')[0];
            const loginPage = document.getElementsByClassName('login')[0];
            if (mainPage) {
                mainPage.style.display = 'flex';
            }
            if (loginPage) {
                loginPage.style.display = 'none';
            }
        }
    });
}
const googleLoginButton = document.getElementById('google-login');
googleLoginButton === null || googleLoginButton === void 0 ? void 0 : googleLoginButton.addEventListener('click', googleSignIn);
