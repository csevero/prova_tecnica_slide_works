import React, { FormEvent } from 'react';
import { ICardProps } from '../../interfaces/card.interface';
import { IListProps } from '../../interfaces/list.interface';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  id: string;
  setId: (value: string) => void;
  idList: string;
  setIdList: (value: string) => void;
  getCardsOfList: (value: string) => void;
  getCardById: (value: string) => void;
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  lists: IListProps[];
  cards: ICardProps[];
  resetFields: () => void;
}

const ModalDeleteCard: React.FC<Props> = ({
  id,
  setId,
  idList,
  setIdList,
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
        <legend>Delete um card</legend>
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
        <div className="buttons">
          <Button onClick={action}>Excluir</Button>
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

export default ModalDeleteCard;
