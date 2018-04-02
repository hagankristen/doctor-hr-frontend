import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableCell,
} from 'material-ui/Table';


var styles = {
	"dataStyle": {
		"marginTop": "3px",
		"marginBottom": "3px",
	}
}

class TextFieldComp extends React.Component {
	constructor() {
		super();
		this.state = {
			"nameTextField": "", // This is where the content for the TextField used below is stored
			"user_email": "User email has not been input.",
			"heart_rates": [],
		}
	}

	onNameTextFieldChange = (event) => {
		// Update the nameTextField state whenever the text field is changed or perturbed in any way:
		this.setState({"nameTextField": event.target.value});
	}

	onButtonClick = (event) => {

		axios.get("http://127.0.0.1:5000/api/heart_rate/" + this.state.nameTextField).then( (response) => {
					console.log(response.status);
					console.log(response);
					this.setState({"user_email": response.data.user_email});
					this.setState({"heart_rates": response.data.recorded_heart_rates});

		})
	}

	render() {
		return (
			<div>
				<TextField
					style={styles.dataStyle}
					value={this.state.nameTextField}
					onChange={this.onNameTextFieldChange}/>
				<Button variant="raised" onClick={this.onButtonClick}>
					<div style={styles.dataStyle}>
					GET
					</div>
				</Button>

				<Table>
					 <TableHeader>
						 <TableRow>
							 <TableCell> Heartrate </TableCell>
						 </TableRow>
					 </TableHeader>
					 <TableBody>
             <TableRow key={this.state.user_email}>
               <TableCell> {this.state.heart_rates} </TableCell>
             </TableRow>
           </TableBody>
				 </Table>
			</div>
		);
	}
}

export default TextFieldComp
