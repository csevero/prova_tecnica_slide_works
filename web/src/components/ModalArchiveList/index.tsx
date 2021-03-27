import React, { FormEvent } from 'react';
import { IListProps } from '../../interfaces/list.interface';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  id: string;
  setId: (value: string) => void;
  lists: IListProps[];
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  resetFields: () => void;
}

const ModalArchiveList: React.FC<Props> = ({
  id,
  setId,
  lists,
  action,
  resetFields,
  setOpenModal,
}: Props) => {
  return (
    <Modal>
      <FormModal>
        <legend>Arquive uma lista</legend>
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
        <div className="buttons">
          <Button onClick={action}>Arquivar</Button>
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

export default ModalArchiveList;
