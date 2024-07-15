import json
import time
import random
from kafka import KafkaProducer
from faker import Faker

# Initialize Faker
fake = Faker()

producer = KafkaProducer(bootstrap_servers='localhost:9093')

"""
Idea 1:
In Race API
1. Consumes all runner sectional fields.
2. In Race API creates 
2. In Race API servers different data to raceiq_api, broadcast_api and third_party_api

Idea 2:
In Race API
1. Subscribes to specific streams in Kafka after identifying



"""


mock_f = 0
while True:
    mock_percentage = random.randint(0, 100)
    mock_s = random.randint(1,60)

    mock_runner_sectional_json = {
        "leading_horse": fake.name(),
        "sector_number": mock_f,
        "sectional_time": f"{mock_s}s",
        "sector_furlongs": f"{mock_f}f"
    }

    mock_runner_sectional_bytes = json.dumps(mock_runner_sectional_json).encode('utf-8')

    producer.send('race_sectionals', mock_runner_sectional_bytes)
    time.sleep(0.5)
    mock_f += 1