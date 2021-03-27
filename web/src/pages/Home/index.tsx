import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import imgCenter from "../../assets/images/imgCenter.png";
import trelloIcon from "../../assets/images/vector/trello.svg";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { IBoardInformationProps } from "../../interfaces/board.interface";
import { ICardProps } from "../../interfaces/card.interface";
import { IListProps } from "../../interfaces/list.interface";
import api from "../../services/api";
import "./style.css";

export default function Home() {
  const [openModal, setOpenModal] = useState("");

  useEffect(() => {
    async function getBoardInformation() {
      const boardInformation = await api.get("/board-info");
      const allLists = await api.get("/board-lists");
      setBoardInfo(boardInformation.data);
      setLists(allLists.data);
    }

    getBoardInformation();
  }, [openModal]);

  const [boardInfo, setBoardInfo] = useState<IBoardInformationProps>();
  const [lists, setLists] = useState<IListProps[]>([]);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [cardInfo, setCardInfo] = useState<ICardProps>();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idList, setIdList] = useState("");
  const [desc, setDesc] = useState("");

  const values = { name, id, idList, desc };

  function resetVariables() {
    setOpenModal("");
    setCards([]);
    setName("");
    setId("");
    setIdList("");
    setDesc("");
  }

  function getCardsOfList(idList: string) {
    api
      .get(`/list-all-cards/${idList}`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCardById(idCard: string) {
    api
      .get(`/card-list/${idCard}`)
      .then((response) => {
        setName(response.data.name);
        setDesc(response.data.desc);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function createList(e: FormEvent) {
    e.preventDefault();

    api
      .post("/list-create", values)
      .then(() => {
        toast.success("Lista criada com sucesso!");

        resetVariables();
      })
      .catch((err) => {
        toast.error("Erro ao criar lista");
        console.log(err);
      });
  }

  async function updateList(e: FormEvent) {
    e.preventDefault();

    api
      .put(`/list-update/${id}`, values)
      .then(() => {
        toast.success("Lista atualizada com sucesso!");

        resetVariables();
      })
      .catch((err) => {
        toast.error("Erro ao atualizar lista");
        console.log(err);
      });
  }

  async function archiveList(e: FormEvent) {
    e.preventDefault();

    api
      .put(`list-archive/${id}`)
      .then(() => {
        toast.success("Lista arquivada com sucesso!");

        resetVariables();
      })
      .catch((err) => {
        toast.error("Erro ao arquivar lista");
        console.log(err);
      });
  }

  async function createCard(e: FormEvent) {
    e.preventDefault();

    api
      .post(`/card-create?idList=${idList}`, values)
      .then(() => {
        toast.success("Card criado com sucesso!");

        resetVariables();
      })
      .catch((err) => {
        toast.error("Erro ao criar card");
        console.log(err);
      });
  }

  async function updateCard(e: FormEvent) {
    e.preventDefault();

    api
      .put(`/card-update/${id}`, values)
      .then(() => {
        toast.success("Card atualizado com sucesso!");

        resetVariables();
      })
      .catch((err) => {
        toast.error("Erro ao atualizar card");
        console.log(err);
      });
  }

  async function deleteCard(e: FormEvent) {
    e.preventDefault();

    window.confirm("Você realmente deseja excluir esse card?") &&
      api
        .delete(`card-delete/${id}`)
        .then(() => {
          toast.success("Card excluído com sucesso!");

          resetVariables();
        })
        .catch((err) => {
          toast.error("Erro ao atualizar card");
          console.log(err);
        });
  }

  return (
    <>
      <div className='container-main'>
        <div className='content'>
          <img className='img-main' src={imgCenter} alt='img Prova Técnica' />
          <div className='header'>
            <h1>{boardInfo?.name}</h1>
            <a
              className='link-trello'
              href={`${boardInfo?.shortUrl}`}
              target='_blank'
              rel='noreferrer'
            >
              <img src={trelloIcon} alt='trello icon' />
              <p>Ver no Trello</p>
            </a>
          </div>
          <div className='controllers'>
            <div className='list-controller'>
              <h2 className='text-center'>Controle de listas</h2>
              <div className='list-controller-actions'>
                <Button onClick={() => setOpenModal("createList")}>
                  Criar
                </Button>
                <Button onClick={() => setOpenModal("updateList")}>
                  Editar
                </Button>
                <Button onClick={() => setOpenModal("archiveList")}>
                  Arquivar
                </Button>
                <a
                  href={`${boardInfo?.shortUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button>Ver Listas no Trello</Button>
                </a>
              </div>
            </div>
            <div className='card-controller'>
              <h2 className='text-center'>Controle de Cards</h2>
              <div className='card-controller-actions'>
                <Button onClick={() => setOpenModal("createCard")}>
                  Criar
                </Button>
                <Button onClick={() => setOpenModal("updateCard")}>
                  Editar
                </Button>
                <Button onClick={() => setOpenModal("deleteCard")}>
                  Apagar
                </Button>
                <a
                  href={`${boardInfo?.shortUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button>Ver Cards no Trello</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal === "createList" ? (
        <Modal>
          <form className='form-modal' onSubmit={createList}>
            <legend>Crie uma nova lista</legend>
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                required
                pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='buttons'>
              <Button>Criar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : openModal === "updateList" ? (
        <Modal>
          <form className='form-modal' onSubmit={updateList}>
            <legend>Edite uma lista</legend>
            <div className='input-block'>
              <select
                name='lists'
                id=''
                required
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                <option value='' hidden>
                  Escolha uma lista para editar
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                required
                pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className='buttons'>
              <Button>Atualizar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : openModal === "archiveList" ? (
        <Modal>
          <form className='form-modal' onSubmit={archiveList}>
            <legend>Arquive uma lista</legend>
            <div className='input-block'>
              <select
                name='lists'
                id=''
                required
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                <option value='' hidden>
                  Escolha uma lista para arquivar
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='buttons'>
              <Button>Arquivar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : openModal === "createCard" ? (
        <Modal>
          <form onSubmit={createCard} className='form-modal'>
            <legend>Crie um novo card</legend>
            <div className='input-block'>
              <select
                name='lists'
                id=''
                required
                value={idList}
                onChange={(e) => {
                  setIdList(e.target.value);
                }}
              >
                <option value='' hidden>
                  Escolha uma lista para criar um card
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                required
                pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='input-block'>
              <label htmlFor='name'>Descrição</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className='buttons'>
              <Button>Criar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : openModal === "updateCard" ? (
        <Modal>
          <form onSubmit={updateCard} className='form-modal'>
            <legend>Atualize um card</legend>
            <div className='input-block'>
              <select
                name='lists'
                id=''
                required
                value={idList}
                onChange={(e) => {
                  setIdList(e.target.value);
                  getCardsOfList(e.target.value);
                }}
              >
                <option value='' hidden>
                  Escolha uma lista para listar os cards
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='input-block'>
              <label htmlFor='card'>Selecione um card</label>
              <select
                name='cards'
                id=''
                required
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  getCardById(e.target.value);
                }}
              >
                <option hidden value=''>
                  Selecione um card
                </option>
                {cards.length > 0 ? (
                  cards.map((card) => {
                    return (
                      <option key={card.id} value={card.id}>
                        {card.name}
                      </option>
                    );
                  })
                ) : (
                  <option value=''>
                    Não há cards nessa lista, selecione outra
                  </option>
                )}
              </select>
            </div>
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                required
                pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='input-block'>
              <label htmlFor='name'>Descrição</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className='buttons'>
              <Button>Atualizar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : openModal === "deleteCard" ? (
        <Modal>
          <form onSubmit={deleteCard} className='form-modal'>
            <legend>Delete um card</legend>
            <div className='input-block'>
              <select
                name='lists'
                id=''
                required
                value={idList}
                onChange={(e) => {
                  setIdList(e.target.value);
                  getCardsOfList(e.target.value);
                }}
              >
                <option value='' hidden>
                  Escolha uma lista para listar os cards
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='input-block'>
              <label htmlFor='card'>Selecione um card</label>
              <select
                name='cards'
                id=''
                required
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  console.log(id);
                }}
              >
                <option hidden value=''>
                  Selecione um card
                </option>
                {cards.length > 0 ? (
                  cards.map((card) => {
                    return (
                      <option key={card.id} value={card.id}>
                        {card.name}
                      </option>
                    );
                  })
                ) : (
                  <option value=''>
                    Não há cards nessa lista, selecione outra
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <Button>Deletar</Button>
              <Button
                backgroundColor='#FF9090'
                onClick={() => {
                  resetVariables();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
