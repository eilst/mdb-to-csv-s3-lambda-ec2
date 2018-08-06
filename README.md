
# Mdb to csv, s3-lambda-ec2

The purpose of this application is to convert mdb files(tables) to csv.
This is the scenario: I want to upload a mdb database daily to s3 from a windows
machine. Then, the relevant tables should be converted to csv and saved in s3.

It's divider in three parts:
### 1. Python sscipt
	So, there is a python script that uploads the desired file - and I used windows
	task shceduler to upload the mdb file at a given time every day.
### 2. Lambda Function
	The ideal scenario was to make the conversion within lambda.
	I found a project in java with some libraries that could make this work.
 	here-> https://github.com/zerokol/MDBtoCSV
	But for now, the lambda function in this proyect ssh into an ec2 instance
	and executes a bash script that does the rest of the work.
### 3. Bash Script
	It pulls the file from s3, converts it to csv, uploads the result to 
	another bucket, deletes the files locally. And that's it.


## License

MIT
