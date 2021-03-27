import React, { FormEvent } from 'react';
import { IListProps } from '../../interfaces/list.interface';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  name: string;
  setName: (value: string) => void;
  idList: string;
  setIdList: (value: string) => void;
  desc: string;
  setDesc: (value: string) => void;
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  lists: IListProps[];
  resetFields: () => void;
}

const ModalCreateCard: React.FC<Props> = ({
  name,
  setName,
  idList,
  setIdList,
  desc,
  setDesc,
  setOpenModal,
  action,
  lists,
  resetFields,
}: Props) => {
  return (
    <Modal>
      <FormModal>
        <legend>Crie um novo card</legend>
        <div className="input-block">
          <select
            name="lists"
            id=""
            required
            value={idList}
            onChange={(e) => {
              setIdList(e.target.value);
            }}
          >
            <option value="" hidden>
              Escolha uma lista para criar um card
            </option>
            {lists.length > 0 ? (
              lists.map((list) => {
                return (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                );
              })
            ) : (
              <option value="">Não há listas criadas nesse board</option>
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
          <Button onClick={action}>Criar</Button>
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

export default ModalCreateCard;
