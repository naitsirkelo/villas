# Use the official SQL Server image as the base image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Copy your SQL data script into the image
ADD your-data.sql /docker-entrypoint-initdb.d/