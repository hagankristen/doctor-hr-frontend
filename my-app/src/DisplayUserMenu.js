import React from 'react';
import axios from 'axios';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {MenuItem} from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';


var gethrurl = "http://127.0.0.1:5000/api/heart_rate/"
var getavgurl = "http://127.0.0.1:5000/api/heart_rate/average/"
var getalluser = "http://127.0.0.1:5000/api/heart_rate/userlist"
var styles = {
	"dataStyle": {
		"marginTop": "15px",
		"marginBottom": "15px",
		"marginLeft": "15px",
		"marginRight": "15px"
	},
	"lengthStyle": {
		width: 300,
	},
};

class DisplayUser extends React.Component {
	constructor() {
		super();
		this.state = {
			"user_email": "",
			"heart_rates": [],
			"times": [],
			"average": [],
			"user_list": []
		}
		this.createUserList()
	}

		createUserList = () => {
			axios.get(getalluser).then( (response) => {
						console.log(response.status);
						console.log(response);
						this.setState({"user_list": response.data.user_emails});
			})
		}

		onMenuSelect = (event) => {
  		this.setState({"user_email": event.target.value}, this.GetData);
		}

		GetData = (event) => {
  		axios.get(gethrurl + this.state.user_email).then( (response) => {
  					console.log(response.status);
  					console.log(response);
  					this.setState({"heart_rates": response.data.recorded_heart_rates});
						this.setState({"times": response.data.hr_times});
  		})

			axios.get(getavgurl + this.state.user_email).then( (response) => {
						console.log(response.status);
						console.log(response);
						this.setState({"average": response.data.average_recorded_heart_rates});

			})

  	}

  	render() {

			var output = this.state.heart_rates.map( (e,i) => {
				return(
					<TableRow key={i}>
						<TableCell>{e}</TableCell>
						<TableCell>{this.state.times[i]}</TableCell>
					</TableRow>
				)
			})

			var cells = this.state.user_list.map( (e,i) => {
				return(
					<MenuItem key={e} value = {e}> {e}</MenuItem>
				)
			})

  		return (

				<div>
				<InputLabel style={styles.dataStyle}>Patient username:</InputLabel>
				<Select
					style={styles.lengthStyle}
					value={this.state.user_email}
					onChange={this.onMenuSelect}>
					{cells}
				</Select>

				<div>
					<Table>
							<TableHead>
								<TableRow>
									<TableCell>Average Recorded Heart Rate (bpm):</TableCell>
									<TableCell>{this.state.average}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Heart Rate (bpm):</TableCell>
									<TableCell>Recorded Time:</TableCell>
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
