FROM microsoft/aspnetcore:2.0

WORKDIR /app

COPY ./train/pack .

ENTRYPOINT ["dotnet", "train.dll"]