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

Dockerize
---
```
cd train
dotnet publish -o out
docker build -t commute-data-api .
docker run --rm -p 1234:80 -e SENSITIVE_DATA_PATH='/config/secrets.json' -v /Users/carole/.microsoft/usersecrets/OpenLDBConfig:/config commute-data-api:latest
```