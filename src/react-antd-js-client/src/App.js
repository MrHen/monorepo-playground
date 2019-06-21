import _ from 'lodash';
import React from 'react';
import { getList } from './links';
import logo from './logo.svg';
import LinksList from './LinksList';

import './App.css';
import 'antd/dist/antd.css';

class App extends React.PureComponent {
  state = {
    links: null,
  };

  componentDidMount = async () => {
    const response = await getList();
    this.setState({
      links: _.get(response, 'results'),
    });
  }

  render() {
    const {
      state: {
        links,
      },
    } = this;

    return (
      <div className="App">
        <header className="App-header">
          <LinksList data={links} />
        </header>
      </div>
    );
  }
}

export default App;
