import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownExampleClearable = (props) => (
  <Dropdown fluid search className="medium" id={props.id}  setState={props.setState} onChange={props.onChange} clearable options={props.options} selection />
)

export default DropdownExampleClearable