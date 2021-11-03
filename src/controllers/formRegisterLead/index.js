function validaNewLead(setVazioNewLead, nome, telefone, email) {
  if (nome === '' || telefone === '' || email === '') {
    setVazioNewLead(true)
    return false
  } else {
    setVazioNewLead(false)
    return true
  }
}
export default validaNewLead
