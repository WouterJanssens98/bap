import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'


class DropdownLargeAdditions extends Component {
    
  state = this.props.options;

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }))
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  render(props) {
    const { currentValue } = this.state

    return (
      <Dropdown
        className="large"
        options={this.props.options}
        search
        selection
        fluid
        allowAdditions
        value={currentValue}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    )
  }
}

export default DropdownLargeAdditions