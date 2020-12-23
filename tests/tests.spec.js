import React from 'react';
import renderer from 'react-test-renderer';
import Auth from '../client/components/Auth'
import Navbar from '../client/components/Navbar'
import App from '../client/app'
import { Provider } from 'react-redux'
import store from '../client/store'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() });

// describe('Examining the syntax of Jest tests', () => {
//     it('sums numbers', () => {
//         expect(1 + 2).toEqual(3);
//         expect(2 + 2).toEqual(4);
//      });
//   });
describe('Login tests', () => {
  test('Auth component renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('Clicking navbar sign up button renders login page', () => {
    let app = mount(
      <Provider store={store}>
        <MemoryRouter >
          <App />
        </MemoryRouter>
      </Provider>
      )
    app.find('.signInNavButton').at(1).simulate('click', { button: 0 })
    app.update();
    expect(app.text().includes('Welcome!')).toBe(true);
    // expect(app.find('#signInContainer')).toHaveLength(1)
    
  })
})
