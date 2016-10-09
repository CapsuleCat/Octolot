import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import Options from './Options';
import AddItems from '/imports/modules/items/components/AddItems';
import Items from '/imports/modules/items/containers/Items';
import ItemSearch from '/imports/modules/items/components/Search';
import Search from '/imports/modules/search/containers/SearchIndex';

class MyStuff extends Component {

  render() {
    return (
      <div>
        <Header>
          <ItemSearch />
        </Header>

        <Items />

        <AddItems />

        <Footer>
          <Options />
        </Footer>

        <Search />
      </div>
    );
  }
}

export default MyStuff;
