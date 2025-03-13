function buttonClicked() {
    const outputDiv = document.getElementById('output'); // Obtén el contenedor donde imprimirás el mensaje
    if (outputDiv) {
        for (let i = 0; i < 5; i++) {
            const newMessage = document.createElement('p'); // Crea un nuevo párrafo
            newMessage.textContent = 'IJOfruTA'; // Establece el texto del párrafo
            outputDiv.appendChild(newMessage); // Añade el párrafo al contenedor
        }
    }
}

const button = document.getElementById('botoncico');
button?.addEventListener('click', buttonClicked);
