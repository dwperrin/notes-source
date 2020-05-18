#!/bin/sh

curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/population.json --output ./public/population.json

curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/nswpostcodes_final.json --output ./public/post-codes.json

# curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_cases.json --output cases_old.json

curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_tests.json --output ./public/tests.json

curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_Cases2.json --output ./public/cases.json

# curl https://nswdac-np-covid-19-postcode-heatmap.azurewebsites.net/datafiles/usecase2.json --output usecases.json
