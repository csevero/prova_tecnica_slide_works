import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import imgCenter from '../../assets/images/imgCenter.png';
import trelloIcon from '../../assets/images/vector/trello.svg';
import Button from '../../components/Button';
import ModalArchiveList from '../../components/ModalArchiveList';
import ModalCreateCard from '../../components/ModalCreateCard';
import ModalCreateList from '../../components/ModalCreateList';
import ModalDeleteCard from '../../components/ModalDeleteCard';
import ModalUpdateCard from '../../components/ModalUpdateCard';
import ModalUpdateList from '../../components/ModalUpdateList';
import { IBoardInformationProps } from '../../interfaces/board.interface';
import { ICardProps } from '../../interfaces/card.interface';
import { IListProps } from '../../interfaces/list.interface';
import api from '../../services/api';
import './style.css';

export default function Home() {
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    async function getBoardInformation() {
      const boardInformation = await api.get('/board-info');
      const allLists = await api.get('/board-lists');
      setBoardInfo(boardInformation.data);
      setLists(allLists.data);
    }

    getBoardInformation();
  }, [openModal]);

  const [boardInfo, setBoardInfo] = useState<IBoardInformationProps>();
  const [lists, setLists] = useState<IListProps[]>([]);
  const [cards, setCards] = useState<ICardProps[]>([]);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [idList, setIdList] = useState('');
  const [desc, setDesc] = useState('');

  const values = { name, id, idList, desc };

  function resetVariables() {
    setOpenModal('');
    setCards([]);
    setName('');
    setId('');
    setIdList('');
    setDesc('');
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

    if (!name) {
      toast.error('Todos campos são obrigatórios');
    } else {
      api
        .post('/list-create', values)
        .then(() => {
          toast.success('Lista criada com sucesso!');

          resetVariables();
        })
        .catch((err) => {
          toast.error('Erro ao criar lista');
          console.log(err);
        });
    }
  }

  async function updateList(e: FormEvent) {
    e.preventDefault();

    if (!name || !id) {
      toast.error('Todos campos são obrigatórios');
    } else {
      api
        .put(`/list-update/${id}`, values)
        .then(() => {
          toast.success('Lista atualizada com sucesso!');

          resetVariables();
        })
        .catch((err) => {
          toast.error('Erro ao atualizar lista');
          console.log(err);
        });
    }
  }

  async function archiveList(e: FormEvent) {
    e.preventDefault();

    if (!id) {
      toast.error('Todos campos são obrigatórios');
    } else {
      api
        .put(`list-archive/${id}`)
        .then(() => {
          toast.success('Lista arquivada com sucesso!');

          resetVariables();
        })
        .catch((err) => {
          toast.error('Erro ao arquivar lista');
          console.log(err);
        });
    }
  }

  async function createCard(e: FormEvent) {
    e.preventDefault();

    if (!name || !idList) {
      toast.error('A lista e o nome são obrigatórios');
    } else {
      api
        .post(`/card-create?idList=${idList}`, values)
        .then(() => {
          toast.success('Card criado com sucesso!');

          resetVariables();
        })
        .catch((err) => {
          toast.error('Erro ao criar card');
          console.log(err);
        });
    }
  }

  async function updateCard(e: FormEvent) {
    e.preventDefault();

    if (!name || !idList || !id) {
      toast.error('Os selects e o nome são obrigatórios');
    } else {
      api
        .put(`/card-update/${id}`, values)
        .then(() => {
          toast.success('Card atualizado  com sucesso!');

          resetVariables();
        })
        .catch((err) => {
          toast.error('Erro ao atualizar card');
          console.log(err);
        });
    }
  }

  async function deleteCard(e: FormEvent) {
    e.preventDefault();

    if (!id || !idList) {
      toast.error('Todos campos são obrigatórios ');
    } else {
      window.confirm('Você realmente deseja excluir esse card?') &&
        api
          .delete(`card-delete/${id}`)
          .then(() => {
            toast.success('Card excluído com sucesso!');

            resetVariables();
          })
          .catch((err) => {
            toast.error('Erro ao excluido card');
            console.log(err);
          });
    }
  }

  return (
    <>
      <div className="container-main">
        <div className="content">
          <img className="img-main" src={imgCenter} alt="img Prova Técnica" />
          <div className="header">
            <h1>{boardInfo?.name}</h1>
            <a
              className="link-trello"
              href={`${boardInfo?.shortUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={trelloIcon} alt="trello icon" />
              <p>Ver no Trello</p>
            </a>
          </div>
          <div className="controllers">
            <div className="list-controller">
              <h2 className="text-center">Controle de listas</h2>
              <div className="list-controller-actions">
                <Button onClick={() => setOpenModal('createList')}>
                  Criar
                </Button>
                <Button onClick={() => setOpenModal('updateList')}>
                  Editar
                </Button>
                <Button onClick={() => setOpenModal('archiveList')}>
                  Arquivar
                </Button>
                <a
                  href={`${boardInfo?.shortUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>Ver Listas no Trello</Button>
                </a>
              </div>
            </div>
            <div className="card-controller">
              <h2 className="text-center">Controle de Cards</h2>
              <div className="card-controller-actions">
                <Button onClick={() => setOpenModal('createCard')}>
                  Criar
                </Button>
                <Button onClick={() => setOpenModal('updateCard')}>
                  Editar
                </Button>
                <Button onClick={() => setOpenModal('deleteCard')}>
                  Apagar
                </Button>
                <a
                  href={`${boardInfo?.shortUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>Ver Cards no Trello</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal === 'createList' ? (
        <ModalCreateList
          name={name}
          setName={setName}
          setOpenModal={setOpenModal}
          action={createList}
          resetFields={resetVariables}
        />
      ) : openModal === 'updateList' ? (
        <ModalUpdateList
          id={id}
          setId={setId}
          name={name}
          setName={setName}
          action={updateList}
          lists={lists}
          setOpenModal={setOpenModal}
          resetFields={resetVariables}
        />
      ) : openModal === 'archiveList' ? (
        <ModalArchiveList
          id={id}
          setId={setId}
          lists={lists}
          resetFields={resetVariables}
          setOpenModal={setOpenModal}
          action={archiveList}
        />
      ) : openModal === 'createCard' ? (
        <ModalCreateCard
          name={name}
          setName={setName}
          idList={idList}
          setIdList={setIdList}
          desc={desc}
          setDesc={setDesc}
          setOpenModal={setOpenModal}
          action={createCard}
          lists={lists}
          resetFields={resetVariables}
        />
      ) : openModal === 'updateCard' ? (
        <ModalUpdateCard
          id={id}
          setId={setId}
          name={name}
          setName={setName}
          idList={idList}
          setIdList={setIdList}
          desc={desc}
          setDesc={setDesc}
          getCardById={getCardById}
          getCardsOfList={getCardsOfList}
          setOpenModal={setOpenModal}
          action={updateCard}
          lists={lists}
          cards={cards}
          resetFields={resetVariables}
        />
      ) : openModal === 'deleteCard' ? (
        <ModalDeleteCard
          id={id}
          setId={setId}
          idList={idList}
          setIdList={setIdList}
          getCardById={getCardById}
          getCardsOfList={getCardsOfList}
          setOpenModal={setOpenModal}
          action={deleteCard}
          lists={lists}
          cards={cards}
          resetFields={resetVariables}
        />
      ) : null}
    </>
  );
}
