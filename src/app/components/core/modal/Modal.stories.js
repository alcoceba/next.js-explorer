import Modal from './Modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default {
  title: 'Core/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Modal open state',
    },
    onClose: {
      action: 'closed',
      description: 'Close handler function',
    },
    children: {
      control: false,
      description: 'Modal content',
    },
  },
};

const ModalWrapper = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', marginBottom: '20px' }}>
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
};

export const Interactive = {
  render: () => (
    <ModalWrapper>
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <h2>Modal Dialog</h2>
        <p>This is a modal dialog content. Click the X or overlay to close.</p>
      </div>
    </ModalWrapper>
  ),
};
