import React       from 'react';
import { expect }  from 'chai';
import { shallow } from 'enzyme';
import App         from './';

describe('<App />', function () {
  var app = shallow(<App />);

  it('Has the app-container class', function () {
    expect(app.hasClass('app-container')).to.equal(true);
  });

  it('Display a text message', function () {
    expect(app.render().text() !== "").to.equal(true);
  });

});