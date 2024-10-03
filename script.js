// Horários disponíveis para cada quadra
const horariosDisponiveis = {
    "Quadra 1": ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    "Quadra 2": ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    "Quadra 3": ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
};

// Captura os campos
const quadraSelect = document.getElementById('quadra');
const dataInput = document.getElementById('data');
const horaSelect = document.getElementById('hora');

// Atualizar os horários disponíveis ao selecionar a quadra ou a data
quadraSelect.addEventListener('change', atualizarHorariosDisponiveis);
dataInput.addEventListener('change', atualizarHorariosDisponiveis);

// Função para atualizar os horários disponíveis com base nos agendamentos
function atualizarHorariosDisponiveis() {
    const quadraSelecionada = quadraSelect.value;
    const dataSelecionada = dataInput.value;

    if (quadraSelecionada && dataSelecionada) {
        // Recuperar os agendamentos salvos
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

        // Filtrar os agendamentos para a data e quadra selecionadas
        const agendamentosQuadra = agendamentos.filter(agendamento => 
            agendamento.quadra === quadraSelecionada && agendamento.data === dataSelecionada
        );

        // Pegar os horários ocupados
        const horariosOcupados = agendamentosQuadra.map(agendamento => agendamento.hora);

        // Limpar o select de horários
        horaSelect.innerHTML = '';

        // Preencher o select com todos os horários (livres e ocupados)
        horariosDisponiveis[quadraSelecionada].forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;

            // Se o horário está ocupado, desabilite e aplique a classe de ocupado
            if (horariosOcupados.includes(horario)) {
                option.disabled = true; // Desabilitar horário ocupado
                option.classList.add('ocupado'); // Adicionar classe 'ocupado' para estilizar
            }

            horaSelect.appendChild(option);
        });
    }
}

// Função para salvar o agendamento no localStorage
document.getElementById('agendamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const quadra = quadraSelect.value;
    const data = dataInput.value;
    const hora = horaSelect.value;
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;

    if (!quadra || !data || !hora) {
        alert('Preencha todos os campos!');
        return;
    }

    const agendamento = { quadra, data, hora, nome, matricula };

    // Recuperar agendamentos existentes no localStorage
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    atualizarAgendamentos();
    document.getElementById('agendamentoForm').reset();
    alert('Agendamento realizado com sucesso!');
});

// Função para atualizar a lista de agendamentos
function atualizarAgendamentos() {
    const listaAgendamentos = document.getElementById('listaAgendamentos');
    listaAgendamentos.innerHTML = '';

    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.forEach(agendamento => {
        const li = document.createElement('li');
        li.textContent = `${agendamento.nome} (Matrícula: ${agendamento.matricula}) agendou a ${agendamento.quadra} para ${agendamento.data} às ${agendamento.hora}`;
        listaAgendamentos.appendChild(li);
    });
}

// Inicializar a lista de agendamentos ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarAgendamentos);
