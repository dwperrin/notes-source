#!/bin/sh

PREFIX=$1

echo $PREFIX

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/population.json --output ./public/data/population.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/nswpostcodes_final.json --output ./public/data/post-codes.json

# curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_cases.json --output cases_old.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_tests.json --output ./public/data/tests-$PREFIX.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_Cases2.json --output ./public/data/cases-$PREFIX.json

# curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_Cases2.json

# curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/usecase2.json --output usecases.json
