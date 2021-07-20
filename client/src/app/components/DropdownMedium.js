import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// const options = [
//   { key: 1, text: 'Choice 1', value: 1 },
//   { key: 2, text: 'Choice 2', value: 2 },
//   { key: 3, text: 'Choice 3', value: 3 },
// ]

const DropdownExampleClearable = (props) => (
  <Dropdown className="medium" id={props.id}  setState={props.setState} onChange={props.onChange} clearable options={props.options} selection />
)

export default DropdownExampleClearable