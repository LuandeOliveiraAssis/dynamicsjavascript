function aplicarMascaraEValidarCelular(executionContext) {
    const formContext = executionContext.getFormContext();

    // Obtém o valor do campo 'numero de telefone celular'
    let celular = formContext.getAttribute("mobilephone").getValue();

    if (celular) {
        // Remove todos os caracteres não numéricos
        let celularNumerico = celular.replace(/\D/g, "");

        // Validação: Se o número  tem 11 dígitos
        if (celularNumerico.length !== 11 ||(/^(\d)\1{10}$/.test(celularNumerico))) {
            // Define uma notificação de erro no campo
            formContext.getControl("mobilephone").setNotification(
                "O numero do celular informado nao tem 11 digitos.",
                "celularInvalido"
            );
            formContext.getAttribute("mobilephone").setValue("");

        } else {
            // Remove notificações de erro se o número for válido
            formContext.getControl("mobilephone").clearNotification("celularInvalido");

            // Aplica a máscara no formato (XX) 9XXXX-XXXX
            celular = celularNumerico.replace(
                /(\d{2})(\d{1})(\d{4})(\d{4})/,
                "($1) $2$3-$4"
            );

            // Atualiza o valor do campo com a máscara aplicada
            formContext.getAttribute("mobilephone").setValue(celular);
        }
    }
}