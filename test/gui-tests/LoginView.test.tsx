import React from 'react';
import renderer from 'react-test-renderer';
import LoginView from '../../app/views/LoginView';

test('renders correctly', ()=>{
	const tree = renderer.create(<LoginView />).toJSON();
	expect(tree).toMatchSnapshot();
});