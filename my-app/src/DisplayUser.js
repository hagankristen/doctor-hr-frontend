import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

var geturl = "http://127.0.0.1:5000/api/heart_rate/"
var styles = {
	"dataStyle": {
		"marginTop": "15px",
		"marginBottom": "15px",
		"marginLeft": "15px",
		"marginRight": "15px"
	}
}

class DisplayUser extends React.Component {
	constructor() {
		super();
		this.state = {
			"nameTextField": "", // This is where the content for the TextField used below is stored
			"user_email": "User email has not been input.",
			"heart_rates": [],
			"times": [],
		}
	}

  	onNameTextFieldChange = (event) => {
  		// Update the nameTextField state whenever the text field is changed or perturbed in any way:
  		this.setState({"nameTextField": event.target.value});
  	}

  	onButtonClick = (event) => {

  		axios.get(geturl + this.state.nameTextField).then( (response) => {
  					console.log(response.status);
  					console.log(response);
  					this.setState({"user_email": response.data.user_email});
  					this.setState({"heart_rates": response.data.recorded_heart_rates});
						this.setState({"times": response.data.hr_times});
  		})
  	}

  	render() {

			var output = this.state.heart_rates.map( (e,i) => {
				return(
					<TableRow key={this.state.times}>
						<TableCell>{e}</TableCell>
						<TableCell>{this.state.times[i]}</TableCell>
					</TableRow>
				)
			}
		)
			//e is one element in heart rate array adn i is an index that corresponds to that element

  		return (
				<div>
  			<div>
  				<TextField
  					style={styles.dataStyle}
  					value={this.state.nameTextField}
  					onChange={this.onNameTextFieldChange}/>
  				<Button variant="raised" onClick={this.onButtonClick} style={styles.dataStyle}>
  					<div style={styles.dataStyle}>
  					GET
  					</div>
  				</Button>
				</div>
				<div>
					<Table>
							<TableHead>
								<TableRow>
									<TableCell>User: </TableCell>
									<TableCell>{this.state.user_email}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Heart Rate</TableCell>
									<TableCell>Recorded Time</TableCell>
								</TableRow>
							</TableHead>
						 <TableBody>{output}</TableBody>
					 </Table>

        </div>
				</div>
    		);
    	}
    }

    export default DisplayUser
