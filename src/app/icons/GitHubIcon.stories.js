import GitHubIcon from './GitHubIcon';

export default {
  title: 'Icons/GitHubIcon',
  component: GitHubIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const Large = {
  args: {
    width: '40',
    height: '40',
  },
};

export const WithColor = {
  args: {
    width: '30',
    height: '30',
    style: { color: 'var(--color-primary)' },
  },
};
