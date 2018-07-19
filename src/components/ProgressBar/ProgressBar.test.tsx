
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import ProgressBar from './ProgressBar';

configure({ adapter: new Adapter() });

describe('components', () => {
  describe('ProgressBar', () => {
    let wrapper: ShallowWrapper;

    it('shows correct progress', () => {
      wrapper = shallow(<ProgressBar done={3} total={9} />);
      expect(wrapper.find('.ProgressBar-text').text()).toBe('33%');
    })
  })
})
