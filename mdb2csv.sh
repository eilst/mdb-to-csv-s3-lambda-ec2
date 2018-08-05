#!/bin/sh
source ./env_variables.env
echo "Starting script"

#Be sure we are on the right time zone
sudo cp /usr/share/zoneinfo/America/La_Paz /etc/localtime

#Get the file from s3
MDB_FILE="$(date +%Y%m%d).mdb"
CSV_FILE="$(date +%Y%m%d).csv"
MONTH_FOLDER="$(date +%Y%m)"
aws s3 cp s3://"${ORIGIN_BUCKET}"/"${MDB_FILE}" .

#MDB-export Day table to csv
mdb-export "${MDB_FILE}" Day > ./${CSV_FILE}

#Copy csv file to s3
aws s3 cp ./"${CSV_FILE}" s3://"${DESTINATION_BUCKET}"/"${MONTH_FOLDER}"/"${CSV_FILE}"
rm "${CSV_FILE}" "${MDB_FILE}"
echo "Done"
