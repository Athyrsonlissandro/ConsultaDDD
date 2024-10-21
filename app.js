document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ddd-form');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ddd = document.getElementById('ddd-input').value;

        try {
            const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
            if (!response.ok) {
                throw new Error('DDD não encontrado');
            }
            const data = await response.json();
            resultadoDiv.innerHTML = `
                <h3>Estado: ${data.state}</h3>
                <h4>Cidades:</h4>
                <ul>
                    ${data.cities.map(city => `<li>${city}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            resultadoDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    });
});
