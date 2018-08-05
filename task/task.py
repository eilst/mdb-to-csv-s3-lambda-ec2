import boto3
from shutil import copyfile
from datetime import datetime

s3 = boto3.client('s3')
year = str(datetime.now().year)
month = datetime.now().month
day = datetime.now().day
type = ".mdb"

if len(str(month)) < 2:
    f_month = "0" + str(month)
else:
    f_month = str(month)

if len(str(day)) < 2:
    f_day = "0" + str(day)
else:
    f_day = str(day)
	
todays_file = year+f_month+f_day+type

filename = "C:\Program Files (x86)\PATH" + todays_file 
bucket_name = 'BUCKET_NAME'
	

s3.upload_file(filename,bucket_name,"PATH_ON_BUCKET/"+todays_file)
