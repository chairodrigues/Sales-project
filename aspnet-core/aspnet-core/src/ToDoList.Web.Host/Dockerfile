FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/ToDoList.Web.Host/ToDoList.Web.Host.csproj", "src/ToDoList.Web.Host/"]
COPY ["src/ToDoList.Web.Core/ToDoList.Web.Core.csproj", "src/ToDoList.Web.Core/"]
COPY ["src/ToDoList.Application/ToDoList.Application.csproj", "src/ToDoList.Application/"]
COPY ["src/ToDoList.Core/ToDoList.Core.csproj", "src/ToDoList.Core/"]
COPY ["src/ToDoList.EntityFrameworkCore/ToDoList.EntityFrameworkCore.csproj", "src/ToDoList.EntityFrameworkCore/"]
WORKDIR "/src/src/ToDoList.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/ToDoList.Web.Host", "src/ToDoList.Web.Host"]
COPY ["src/ToDoList.Web.Core", "src/ToDoList.Web.Core"]
COPY ["src/ToDoList.Application", "src/ToDoList.Application"]
COPY ["src/ToDoList.Core", "src/ToDoList.Core"]
COPY ["src/ToDoList.EntityFrameworkCore", "src/ToDoList.EntityFrameworkCore"]
WORKDIR "/src/src/ToDoList.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "ToDoList.Web.Host.dll"]
