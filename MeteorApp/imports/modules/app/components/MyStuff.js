import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import Options from './Options';
import Search from '/imports/modules/search/components/SearchIndex';
import Items from '/imports/modules/items/containers/Items';

class MyStuff extends Component {

  render() {
    return (
      <div>
        <Header>
          <Search />
        </Header>

        <Items />

        <Footer>
          <Options />
        </Footer>
      </div>
    );
  }
}

export default MyStuff;
