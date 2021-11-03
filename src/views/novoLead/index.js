import './style.css'
import logo from '../../assets/logo.png'
import close from '../../assets/close-modal.svg'
import { useState } from 'react'
import validaNewLead from '../../controllers/formRegisterLead'

function NovoLead({ handleClick, cacheLeads, setCacheLeads }) {
  const [vazioNewLead, setVazioNewLead] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [allCheckbox, setAllCheckbox] = useState({
    geral: false,
    rpa: false,
    produto: false,
    analytics: false,
    bpm: false
  })

  function handleSave(event) {
    const validoParaRegistro = validaNewLead(
      setVazioNewLead,
      nome,
      telefone,
      email
    )
    if (!validoParaRegistro) {
      return
    }
    event.preventDefault()
    window.confirm('Lead incluído com sucesso')
    const { rpa, produto, analytics, bpm } = allCheckbox
    const oportunidades = []
    rpa && oportunidades.push('RPA')
    produto && oportunidades.push('Produto Digital')
    analytics && oportunidades.push('Analytics')
    bpm && oportunidades.push('BPM')
    const newLead = [
      {
        nome,
        telefone,
        email,
        oportunidades
      },
      {
        nome: ''
      },
      {
        nome: ''
      }
    ]
    setCacheLeads([...cacheLeads, newLead])
    handleClick()
    setAllCheckbox({
      geral: false,
      rpa: false,
      produto: false,
      analytics: false,
      bpm: false
    })
    setNome('')
    setTelefone('')
    setEmail('')
  }

  function handleCheckBox(event) {
    if (event.target.name === 'geral') {
      setAllCheckbox({
        geral: !allCheckbox.geral,
        rpa: event.target.checked,
        produto: event.target.checked,
        analytics: event.target.checked,
        bpm: event.target.checked
      })
    }
    if (event.target.name === 'rpa') {
      setAllCheckbox({ ...allCheckbox, rpa: !allCheckbox.rpa })
    }
    if (event.target.name === 'produto') {
      setAllCheckbox({ ...allCheckbox, produto: !allCheckbox.produto })
    }
    if (event.target.name === 'analytics') {
      setAllCheckbox({ ...allCheckbox, analytics: !allCheckbox.analytics })
    }
    if (event.target.name === 'bpm') {
      setAllCheckbox({ ...allCheckbox, bpm: !allCheckbox.bpm })
    }
  }

  function handleNome(event) {
    const nome = event.target.value
    setNome(nome)
  }

  function handleTelefone(event) {
    const telefone = event.target.value
    setTelefone(telefone)
  }

  function handleEmail(event) {
    const email = event.target.value
    setEmail(email)
  }

  return (
    <div className="container-novolead">
      <div className="header-novolead">
        <header>
          <img src={logo} alt="" />
        </header>
        <h2>Novo Lead</h2>
        <button className="close-icon" onClick={handleClick}>
          <img src={close} alt="Fechar Modal" />
        </button>
      </div>
      <div className="body-novolead">
        <div className="form-novolead">
          <label htmlFor="">Nome*</label>
          <input type="text" onChange={handleNome} value={nome} />
          <label htmlFor="">Telefone*</label>
          <input type="text" onChange={handleTelefone} value={telefone} />
          <label htmlFor="">Email*</label>
          <input type="text" onChange={handleEmail} value={email} />
        </div>
        <div className="moreitems-novolead">
          <span>Oportunidades*</span>
          <table className="table-novolead">
            <thead className="table-headnovolead">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="geral"
                    onClick={handleCheckBox}
                    checked={allCheckbox.geral}
                  />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="rpa"
                    onClick={handleCheckBox}
                    checked={allCheckbox.rpa}
                  />
                </td>
                <td>RPA</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="produto"
                    onClick={handleCheckBox}
                    checked={allCheckbox.produto}
                  />
                </td>
                <td>Produto Digital</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="analytics"
                    onClick={handleCheckBox}
                    checked={allCheckbox.analytics}
                  />
                </td>
                <td>Analytics</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="bpm"
                    value="BPM"
                    onClick={handleCheckBox}
                    checked={allCheckbox.bpm}
                  />
                </td>
                <td>BPM</td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>

          <button className="btn-novolead" onClick={handleSave}>
            Salvar
          </button>
          <div className="erro">
            <p className={vazioNewLead ? '' : 'hidden'}>
              Todos os campos são obrigatórios
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NovoLead
