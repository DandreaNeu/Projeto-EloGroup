import './style.css'
import logo from '../../assets/logo.png'
import NovoLead from '../novoLead'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function PainelLeads() {
  const [modalAberto, setModalAberto] = useState(false)
  const [painelLeads, setPainelLeads] = useState([])
  const [cacheLeads, setCacheLeads] = useLocalStorage('Leads', [])

  useEffect(() => {
    setPainelLeads(cacheLeads)
  }, [cacheLeads])

  function handleClick() {
    setModalAberto(!modalAberto)
  }

  return (
    <div className="container-painelleads">
      <div className="border-painelleads">
        <div className="header">
          <header>
            <img src={logo} alt="" />
          </header>
          <h2>Painel de Leads</h2>
          <Link to="/">Voltar ao Início</Link>
        </div>
        <button className="btn-painelleads" onClick={handleClick}>
          Novo Lead (*)
        </button>
        <table className="table-painelleads">
          <thead className="table-head">
            <tr>
              <th>Cliente em Potencial</th>
              <th>Dados Confirmados</th>
              <th>Reunião Agendada</th>
            </tr>
          </thead>
          <tbody>
            {painelLeads.map((item, index) => {
              function handleOnDragEnd(result) {
                if (result.destination === null) {
                  return
                }
                if (result.source.index > result.destination.index) {
                  return
                }
                if (result.destination.index > result.source.index + 1) {
                  return
                }
                if (!item[result.source.index].nome) {
                  return
                }
                const newPainel = Array.from(painelLeads)
                const items = Array.from(item)
                const [reorderedItem] = items.splice(result.source.index, 1)
                items.splice(result.destination.index, 0, reorderedItem)
                newPainel[index] = items

                setCacheLeads(newPainel)
              }
              return (
                <DragDropContext onDragEnd={handleOnDragEnd} key={index}>
                  <Droppable
                    droppableId={'empresa' + index}
                    direction="horizontal"
                  >
                    {provided => (
                      <tr
                        className={'empresa' + index}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        key={index}
                      >
                        {provided.placeholder}
                        {item.map((posicao, indice) => (
                          <Draggable
                            key={posicao.nome + indice}
                            draggableId={posicao.nome + indice}
                            index={indice}
                          >
                            {provided => (
                              <td
                                name={posicao.nome + index}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {posicao.nome}
                              </td>
                            )}
                          </Draggable>
                        ))}
                      </tr>
                    )}
                  </Droppable>
                </DragDropContext>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className={'modal ' + (modalAberto ? '' : 'hidden')}>
        <NovoLead
          handleClick={handleClick}
          cacheLeads={cacheLeads}
          setCacheLeads={setCacheLeads}
        />
      </div>
    </div>
  )
}

export default PainelLeads
