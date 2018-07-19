
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import Loader from './Loader';

configure({ adapter: new Adapter() });

describe('components', () => {
  describe('Loader', () => {
    let wrapper: ShallowWrapper;

    it('can be loading', () => {
      wrapper = shallow(<Loader />);
      expect(wrapper.find('.Loader-loading').length).toBe(1);
      wrapper = shallow(<Loader loading={true} />);
      expect(wrapper.find('.Loader-loading').length).toBe(1);
      wrapper = shallow(<Loader loading={false} />);
      expect(wrapper.find('.Loader-loading').length).toBe(0);
    })
  })
})
