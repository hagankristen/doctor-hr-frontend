import React from 'react';
import AppBar from 'material-ui/AppBar';
import DisplayUser from './DisplayUserMenu.js';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

var styles = {
	"appBarStyle": {
		"marginBottom": "20px",
    "height": "60px",
    "backgroundColor": "red",
    "fontSize": "25px",
    "color": "white",
	}
}

class App extends React.Component {
  render() {
    return (
        <div>
          <AppBar position="static" style={styles.appBarStyle}>
            <Toolbar>
              <Typography variant="title" color="inherit">
                Patient Heart Rate Database
              </Typography>
            </Toolbar>
          </AppBar>
         <DisplayUser/>
        </div>

    );
  }
}

export default App;
