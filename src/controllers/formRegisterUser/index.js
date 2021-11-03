function validaUsuario(
  setCamposVazio,
  setPassword,
  setConfPassword,
  usuario,
  senha,
  confSenha
) {
  if (usuario === '' || senha === '' || confSenha === '') {
    setCamposVazio(true)
    return false
  } else {
    setCamposVazio(false)
  }
  const senhaValida = validaSenha(senha)
  setPassword(validaSenha(senha))
  if (senhaValida) {
    return false
  } else {
  }

  if (confSenha !== senha) {
    setConfPassword(true)
    return false
  } else {
    setConfPassword(false)
    return true
  }
}

function validaSenha(senha) {
  const alfabeto = 'abcdefghijklmnopqrstuvwxyzç'
  let temNumero = false
  let temLetra = false
  let temCaracterEspecial = false

  if (senha.length < 8) {
    return true
  }

  for (let i = 0; i < senha.length; i++) {
    if (Number(senha[i])) {
      temNumero = true
    } else if (alfabeto.includes(senha[i].toLowerCase())) {
      temLetra = true
    } else {
      temCaracterEspecial = true
    }

    if (temNumero && temLetra && temCaracterEspecial) {
      return false
    }
  }
  return true
}

export default validaUsuario
