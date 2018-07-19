import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ErrorMessage } from './ErrorMessage';

configure({ adapter: new Adapter() });

describe('components', () => {
  describe('ErrorMessage', () => {
    let wrapper: ShallowWrapper;

    it('displays error', () => {
      const msg = 'Error message';
      const error = new Error(msg);
      wrapper = shallow(<ErrorMessage error={error} />);
      expect(wrapper.find('.ErrorMessage').text()).toContain(msg)
    })
  })
})
