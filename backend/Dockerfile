# Use official Python image
FROM python:3.11-slim

# Set environment vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy app files
COPY . .

# Expose port
EXPOSE 8000

# Start server with correct module path
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
