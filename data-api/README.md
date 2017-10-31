# Data API service for Commute page

Set up
---
```
dotnet restore
```

Build
---
```
dotnet build
```

Run
---
```
cd train
dotnet run
```
Modify the environment variable SENSITIVE\_DATA\_PATH in [./train/Properties/launchSettings.json](/train/Properties/launchSettings.json) if needed.

Dockerize
---
```
cd train
rm -rf pack && dotnet publish -o pack
docker build -t commute-data-api .
docker run --rm -p 1234:80 -e SENSITIVE_DATA_PATH='/config/secrets.json' -v /path/to/sensitive/data/dir:/config caroleo/commute-data-api:<version>
```