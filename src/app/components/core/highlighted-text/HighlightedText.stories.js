import HighlightedText from './HighlightedText';

export default {
  title: 'Core/HighlightedText',
  component: HighlightedText,
  argTypes: {
    text: { control: 'text' },
    search: { control: 'text' },
  },
};

const Template = (args) => <HighlightedText {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Hello World',
  search: '',
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  text: 'Hello World',
  search: 'World',
};

export const MultipleMatches = Template.bind({});
MultipleMatches.args = {
  text: 'hello hello hello world',
  search: 'hello',
};

export const CaseInsensitive = Template.bind({});
CaseInsensitive.args = {
  text: 'Hello WORLD hello',
  search: 'hello',
};

export const PartialMatch = Template.bind({});
PartialMatch.args = {
  text: 'The quick brown fox',
  search: 'ow',
};

export const NoMatch = Template.bind({});
NoMatch.args = {
  text: 'The quick brown fox',
  search: 'xyz',
};

export const LongText = Template.bind({});
LongText.args = {
  text: 'The quick brown fox jumps over the lazy dog. The fox is quick and clever.',
  search: 'quick',
};
