import Spinner from './Spinner';

export default {
  title: 'Core/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Small = {
  args: {
    size: 'small',
  },
};

export const Medium = {
  args: {
    size: 'medium',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Large</p>
      </div>
    </div>
  ),
};
