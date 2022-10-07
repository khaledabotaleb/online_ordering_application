# Online Order System
### Run Using Docker:
``` sh
# Note we need to add .env first at base direcotry 
# .env file will hold those data: 
SECRET_KEY=#YourStrongSecretKey
SQL_DATABASE=OnlineOrderSystemDB
SQL_USER=UserName
SQL_PASSWORD=StrongPassword
SQL_ENGINE=django.db.backends.postgresql_psycopg2
SQL_HOST=localhost
SQL_PORT=5432
```
```` sh
# run in terminal
- docker-compose up
To view API documentation swagger interface can be used:
````
http://127.0.0.1:8000/api/docs/
```sh
this link will only be available after running docker
```
for admin portal use:
```
http://127.0.0.1:8000/admin/

using email: admin@mail.com
      password: 12345678
```
Note:
If .env file does not exist, the default values will be used which will lead to the use of sqlite instead of Postgres

### running frontend with angular:
```
after clone the app go to folder onlineOrder 
install dependances with npm i -f
and run the frontend using ng serve