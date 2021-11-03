import './style.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import validaUsuario from '../../controllers/formRegisterUser'
import { useLocalStorage } from 'react-use';

function Home() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [camposVazio, setCamposVazio] = useState(false)
    const [password, setPassword] = useState(false)
    const [confPassword, setConfPassword] = useState(false)
    const history = useHistory()
    const [
        cacheUsuario,
        setCacheUsuario
      ] = useLocalStorage('Usuario', []);

    function handleClick() {
        const validoParaRegistro = validaUsuario(
            setCamposVazio,
            setPassword,
            setConfPassword,
            usuario,
            senha,
            confSenha
        )
        if(!validoParaRegistro){
            return
        }
    
        const newUser = {
            usuario,
            senha
        }

        setCacheUsuario([...cacheUsuario, newUser])
        history.push('/painel')
    }

    return (
        <div className="container-index">
            <div className="border">
                <header>
                    <img className="logo" src={logo} alt="" />
                </header>
                <div className="box-erros">
                    <p className={camposVazio ? '' : 'hidden'}>
                        Todos os campos são obrigatórios
                    </p>
                    <p className={password ? '' : 'hidden'}>
                        Password deve possuir ao menos 8 digítos , sendo ao menos um
                        caracter especial , um caracter numérico e um caracter alfanumerico
                    </p>
                    <p className={confPassword ? '' : 'hidden'}>
                        Password e confirmação devem ser iguais
                    </p>
                </div>
                <label htmlFor="usuario">Usuário*</label>
                <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
                <label htmlFor="password">Password*</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <label htmlFor="confpassword">Confirmação Password*</label>
                <input
                    type="password"
                    name="confpassword"
                    id="confpassword"
                    value={confSenha}
                    onChange={e => setConfSenha(e.target.value)}
                />
                <button
                    className="btn-register"
                    onClick={handleClick}
                >
                    Registrar
                </button>
            </div>
        </div>
    )
}

export default Home
