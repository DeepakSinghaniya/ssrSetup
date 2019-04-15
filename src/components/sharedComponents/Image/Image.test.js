import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Image from './Image'

configure({ adapter: new Adapter() });

describe('<Image />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Image
            src=""
            thumb=""
            alt=""
            title=""
            height=""
            width=""
        />);
    });

    it('should render img tag', () => {
        expect(wrapper.find('img')).toHaveLength(1);
    });
});
