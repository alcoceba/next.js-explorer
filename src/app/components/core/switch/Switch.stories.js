import Switch from './Switch';
import SunIcon from '../../../icons/SunIcon';
import MoonIcon from '../../../icons/MoonIcon';

export default {
  title: 'Core/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'HTML input id attribute',
    },
    isActive: {
      control: 'boolean',
      description: 'Toggle state',
    },
    onClick: {
      action: 'toggled',
      description: 'Click/toggle handler',
    },
    children: {
      control: false,
      description: 'Content inside the toggle ball',
    },
  },
};

export const Inactive = {
  args: {
    id: 'toggle-1',
    isActive: false,
  },
};

export const Active = {
  args: {
    id: 'toggle-2',
    isActive: true,
  },
};

export const WithIcon = {
  args: {
    id: 'theme-toggle',
    isActive: false,
    children: <SunIcon />,
  },
};

export const WithMoonIcon = {
  args: {
    id: 'theme-toggle-dark',
    isActive: true,
    children: <MoonIcon />,
  },
};

export const WithText = {
  args: {
    id: 'toggle-text',
    isActive: false,
    children: '○',
  },
};
