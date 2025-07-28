# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the runnin.sh script into the container at /app
COPY runnin.sh .

# Give execute permissions to the script
RUN chmod +x runnin.sh

# Expose the port that the HTTP server will run on
EXPOSE 8020

# Command to run the application
# This will execute the runnin.sh script, which in turn starts the Python HTTP server
CMD ["./runnin.sh"]
