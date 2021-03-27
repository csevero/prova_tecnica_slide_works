import React, { FormEvent } from 'react';
import Button from '../Button';
import FormModal from '../FormModal';
import Modal from '../Modal';

interface Props {
  name: string;
  setName: (value: string) => void;
  setOpenModal: (value: string) => void;
  action: (value: FormEvent) => void;
  resetFields: () => void;
}

const ModalCreateList: React.FC<Props> = ({
  name,
  setName,
  setOpenModal,
  action,
  resetFields,
}: Props) => {
  return (
    <Modal>
      <FormModal>
        <legend>Crie uma nova lista</legend>
        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

export default ModalCreateList;
