import React from 'react'

export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  componentWillReceiveProps(newProps) {
    console.log('will receive props'+newProps.childCount);
  }

  shouldComponentUpdate() {
    console.log('should update');
    return true;
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('did update');
  }
  render() {
    return <div>
      <h2>这里是子组件</h2>
      <p>{this.props.childCount}</p>
    </div>

  }
}