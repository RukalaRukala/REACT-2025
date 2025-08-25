import { Component } from 'react';

class App extends Component<Record<string, never>, { name: string }> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      name: 'Hello',
    };
  }

  render() {
    return <div className="app">{this.state.name}</div>;
  }
}

export default App;
