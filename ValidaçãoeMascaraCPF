function handleCpfField(executionContext) {
    var formContext = executionContext.getFormContext(); // Obtém o contexto do formulário
    var cpfField = formContext.getAttribute("contoso_cpf"); // Nome lógico do campo CPF

    if (!cpfField) {
        console.error("O campo 'contoso_cpf' não foi encontrado no formulário.");
        return;
    }

    var cpf = cpfField.getValue(); // Obtém o valor do campo

    console.log("Valor do CPF:", cpf); // Exibe o valor no console

    if (cpf) {
        // Remove caracteres não numéricos para validação
        var rawCpf = cpf.replace(/\D/g, "");

        // Validação do CPF
        if (!isValidCpf(rawCpf)) {
            // Exibe mensagem de erro no formulário usando Unicode
            formContext.ui.setFormNotification(
                "O CPF informado n\u00e3o \u00e9 v\u00e1lido. O campo ser\u00e1 limpo para nova tentativa.",
                "ERROR",
                "cpf_error"
            );

            // Limpa o campo CPF para o usuário digitar novamente
            cpfField.setValue(""); // Limpa o campo de CPF
        } else {
            // Remove qualquer notificação de erro existente
            formContext.ui.clearFormNotification("cpf_error");

            // Aplica a máscara ao CPF válido
            var formattedCpf = rawCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            cpfField.setValue(formattedCpf); // Define o valor formatado
        }
    }
}

// Função auxiliar para validar CPF
function isValidCpf(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
    }

    var soma = 0;
    var resto;

    // Validação do primeiro dígito verificador
    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (var i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
}
