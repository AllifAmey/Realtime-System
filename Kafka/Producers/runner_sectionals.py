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


while True:
    mock_horse_name = fake.name()
    mock_finish_position = random.randint(1, 12)
    mock_percentage = random.randint(0, 100)
    mock_s = random.randint(1,60)
    mock_m = random.randint(0,2)
    race_1_id = "1"
    race_2_id = "2"

    mock_runner_sectional = {
        "horse_name": mock_horse_name,
        "finish_position": mock_finish_position,
        "finish_speed_percentage": f"{mock_percentage}%",
        "race_time": f"{mock_m}m {mock_s}s",
    }

    mock_race_1_sectionals = {
        **mock_runner_sectional,
        "race_id": race_1_id
    }

    mock_race_2_sectionals = {
        **mock_runner_sectional,
        "race_id": race_2_id
    }

    mock_runner_sectional_bytes_1 = json.dumps(mock_race_1_sectionals).encode('utf-8')
    mock_runner_sectional_bytes_2 = json.dumps(mock_race_2_sectionals).encode('utf-8')


    producer.send('runner_sectionals', mock_runner_sectional_bytes_1, key=race_1_id.encode('utf-8'))
    producer.send('runner_sectionals', mock_runner_sectional_bytes_2, key=race_2_id.encode('utf-8'))
    time.sleep(2)