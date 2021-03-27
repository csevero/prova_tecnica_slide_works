import React, { FormEvent } from 'react';
import { ICardProps } from '../../interfaces/card.interface';
import { IListProps } from '../../interfaces/list.interface';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  id: string;
  setId: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  idList: string;
  setIdList: (value: string) => void;
  desc: string;
  setDesc: (value: string) => void;
  getCardsOfList: (value: string) => void;
  getCardById: (value: string) => void;
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  lists: IListProps[];
  cards: ICardProps[];
  resetFields: () => void;
}

const ModalUpdateCard: React.FC<Props> = ({
  id,
  setId,
  name,
  setName,
  idList,
  setIdList,
  desc,
  setDesc,
  getCardsOfList,
  getCardById,
  setOpenModal,
  action,
  lists,
  cards,
  resetFields,
}: Props) => {
  return (
    <Modal>
      <FormModal>
        <legend>Atualize um card</legend>
        <div className="input-block">
          <select
            name="lists"
            id=""
            required
            value={idList}
            onChange={(e) => {
              setIdList(e.target.value);
              getCardsOfList(e.target.value);
            }}
          >
            <option value="" hidden>
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
        <div className="input-block">
          <label htmlFor="card">Selecione um card</label>
          <select
            name="cards"
            id=""
            required
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              getCardById(e.target.value);
            }}
          >
            <option hidden value="">
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
              <option value="">
                Não há cards nessa lista, selecione outra
              </option>
            )}
          </select>
        </div>
        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            required
            pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="name">Descrição</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="buttons">
          <Button onClick={action}>Atualizar</Button>
          <Button
            backgroundColor="#FF9090"
            onClick={() => {
              setOpenModal('');
              resetFields();
            }}
          >
            Cancelar
          </Button>
        </div>
      </FormModal>
    </Modal>
  );
};

export default ModalUpdateCard;
