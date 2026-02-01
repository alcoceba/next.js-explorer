import CollapseIcon from './CollapseIcon';
import CopyIcon from './CopyIcon';
import ExpandIcon from './ExpandIcon';
import GitHubIcon from './GitHubIcon';
import InfoIcon from './InfoIcon';
import MoonIcon from './MoonIcon';
import SearchIcon from './SearchIcon';
import SizesIcon from './SizesIcon';
import SortIcon from './SortIcon';
import SunIcon from './SunIcon';

const icons = [
  { name: 'CollapseIcon', component: CollapseIcon, description: 'Collapse tree nodes' },
  { name: 'CopyIcon', component: CopyIcon, description: 'Copy to clipboard' },
  { name: 'ExpandIcon', component: ExpandIcon, description: 'Expand tree nodes' },
  { name: 'GitHubIcon', component: GitHubIcon, description: 'GitHub link' },
  { name: 'InfoIcon', component: InfoIcon, description: 'Information' },
  { name: 'MoonIcon', component: MoonIcon, description: 'Dark mode' },
  { name: 'SearchIcon', component: SearchIcon, description: 'Search' },
  { name: 'SizesIcon', component: SizesIcon, description: 'Show sizes' },
  { name: 'SortIcon', component: SortIcon, description: 'Sort options' },
  { name: 'SunIcon', component: SunIcon, description: 'Light mode' },
];

export default {
  title: 'Icons/Gallery',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete icon gallery showing all available icons in the application.',
      },
    },
  },
  tags: ['autodocs'],
};

const galleryStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  padding: '2rem',
  backgroundColor: 'var(--color-bg-primary)',
  minHeight: '100vh',
};

const iconCardStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: 'var(--color-bg-secondary)',
  borderRadius: '8px',
  border: '1px solid var(--color-border)',
};

const iconContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  backgroundColor: 'var(--color-bg-tertiary)',
  borderRadius: '4px',
};

const nameStyles = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'var(--color-text)',
  textAlign: 'center',
};

const descriptionStyles = {
  fontSize: '12px',
  color: 'var(--color-text)',
  opacity: 0.7,
  textAlign: 'center',
};

export const AllIcons = {
  render: () => (
    <div style={galleryStyles}>
      {icons.map(({ name, component: IconComponent, description }) => (
        <div key={name} style={iconCardStyles}>
          <div style={iconContainerStyles}>
            <IconComponent width="36" height="36" />
          </div>
          <div style={nameStyles}>{name}</div>
          <div style={descriptionStyles}>{description}</div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-primary)' }}>
      <h3 style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>Icon Sizes</h3>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {[18, 24, 32].map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--color-text)' }}>
              {size}x{size}px
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={iconContainerStyles}>
                <SearchIcon width={String(size)} height={String(size)} />
              </div>
              <div style={iconContainerStyles}>
                <ExpandIcon width={String(size)} height={String(size)} />
              </div>
              <div style={iconContainerStyles}>
                <CopyIcon width={String(size)} height={String(size)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
