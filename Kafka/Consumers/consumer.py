from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
        'runner_sectionals',
        bootstrap_servers="localhost:9093"
    )
count = 0
try:
    for message in consumer:
        count += 1
        if count == 5:
            consumer.stop()
            print("hello")
        data = message.value
        data = json.loads(data.decode('utf-8'))
        print(data)
except:
    print("I am err")
    consumer.close()
    pass