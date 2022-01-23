import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';
import { mockTabs } from './__mocks__/Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: mockTabs,
};
