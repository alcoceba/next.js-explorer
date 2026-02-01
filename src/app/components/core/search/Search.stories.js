import React, { useState } from 'react';
import Search from './Search';

export default {
  title: 'Core/Search',
  component: Search,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    totalResults: { control: 'number' },
    isSearching: { control: 'boolean' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || '');
  return <Search {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Search...',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'example search',
  placeholder: 'Search...',
};

export const WithResults = Template.bind({});
WithResults.args = {
  value: 'query',
  totalResults: 42,
  placeholder: 'Search items...',
};

export const SingleResult = Template.bind({});
SingleResult.args = {
  value: 'unique',
  totalResults: 1,
  placeholder: 'Search...',
};

export const NoResults = Template.bind({});
NoResults.args = {
  value: 'nothing',
  totalResults: 0,
  placeholder: 'Search...',
};

export const IsSearching = Template.bind({});
IsSearching.args = {
  value: 'loading',
  isSearching: true,
  placeholder: 'Search...',
};

const FilterTemplate = (args) => {
  const [value, setValue] = useState(args.value || '');
  const [filterValue, setFilterValue] = useState(args.filterValue || 'all');
  return (
    <Search
      {...args}
      value={value}
      onChange={setValue}
      filterValue={filterValue}
      onFilterChange={setFilterValue}
    />
  );
};

export const WithFilters = FilterTemplate.bind({});
WithFilters.args = {
  value: 'search term',
  totalResults: 15,
  filterOptions: [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ],
  filterValue: 'all',
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  value: '',
  placeholder: 'Find users by name or email...',
};
