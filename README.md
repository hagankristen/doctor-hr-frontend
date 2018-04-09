# doctor-hr-frontend
Frontend application code using react to interact with codebase from repo called heart_rate_database_information BME590 Databases Assignment (which can be found [here](https://github.com/hagankristen/heart_rate_databases_introduction). 

To start this app,  first get the mongodb program running. After installing docker on the VM (provided by Duke University), simply run: 
```
docker run -v $PWD/db:/data/db -p 27017:27017 mongo
```

On the local machine, clone the repo linked above and run the following lines 

```
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

After the required libraries are installed, run the heart_db_server.py apis with

```
FLASK_APP=heart_db_server.py flask run
```
