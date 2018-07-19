import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { App } from './App';

configure({ adapter: new Adapter() });

describe('components', () => {
  describe('App', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('renders without crashing', () => {
      wrapper = shallow(<App />);
      expect(wrapper.find('.App-title').text()).toContain('React QUIZ');
    })
  })
})
