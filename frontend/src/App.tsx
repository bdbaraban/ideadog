import React from 'react';
import Navbar from './components/Navbar';
import AutoGrid from './components/AutoGrid';

export default class App extends React.Component<{}, {}> {
  public render(): React.ReactElement {
    return (
      <div>
        <Navbar />
        <AutoGrid />
      </div>
    );
  }
}
