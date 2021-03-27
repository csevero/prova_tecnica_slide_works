import React, { FormEvent } from 'react';
import { IListProps } from '../../interfaces/list.interface';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  id: string;
  setId: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  lists: IListProps[];
  resetFields: () => void;
}

const ModalUpdateList: React.FC<Props> = ({
  id,
  setId,
  name,
  setName,
  setOpenModal,
  action,
  lists,
  resetFields,
}: Props) => {
  return (
    <Modal>
      <FormModal>
        <legend>Edite uma lista</legend>
        <div className="input-block">
          <select
            name="lists"
            id=""
            required
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          >
            <option value="" hidden>
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
        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            required
            pattern="[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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

export default ModalUpdateList;
