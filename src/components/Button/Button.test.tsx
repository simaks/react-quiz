import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as sinon from 'sinon';
import { Button, ButtonSizes, ButtonTypes } from './Button';

configure({ adapter: new Adapter() });

describe('components', () => {
  describe('Button', () => {
    let wrapper: ShallowWrapper;

    it('contains text passed as children', () => {
      const testText = 'TXT test';
      wrapper = shallow(<Button>{testText}</Button>);
      expect(wrapper.find('.Button').text()).toBe(testText);
    })

    it('supports different types', () => {
      wrapper = shallow(<Button type={ButtonTypes.SUCCESS}>Button</Button>);
      expect(wrapper.find('.Button-success').length).toBe(1);
      expect(wrapper.find('.Button-danger').length).toBe(0);
      wrapper = shallow(<Button type={ButtonTypes.DANGER}>Button</Button>);
      expect(wrapper.find('.Button-success').length).toBe(0);
      expect(wrapper.find('.Button-danger').length).toBe(1);
    })

    it('supports different sizes', () => {
      wrapper = shallow(<Button />);
      expect(wrapper.find('.Button-lg').length).toBe(0);
      wrapper = shallow(<Button size={ButtonSizes.LG} />);
      expect(wrapper.find('.Button-lg').length).toBe(1);
    })

    it('can be block', () => {
      wrapper = shallow(<Button />);
      expect(wrapper.find('.Button-block').length).toBe(0);
      wrapper = shallow(<Button block={true} />);
      expect(wrapper.find('.Button-block').length).toBe(1);
    })

    it('has working onClick', () => {
      const mockCallBack = sinon.spy();
      wrapper = shallow(<Button onClick={mockCallBack} />);
      expect(mockCallBack).toHaveProperty('callCount', 0);
      wrapper.find('.Button').simulate('click');
      expect(mockCallBack).toHaveProperty('callCount', 1);
    })

    it('can be disabled', () => {
      wrapper = shallow(<Button />);
      expect(wrapper.find('.Button[disabled]').length).toBe(0);
      wrapper = shallow(<Button disabled={true} />);
      expect(wrapper.find('.Button[disabled]').length).toBe(1);
    })
  })
})
