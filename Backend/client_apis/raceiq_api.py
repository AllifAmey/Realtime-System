from fastapi import FastAPI, WebSocket
from kafka import KafkaConsumer
import json
import uvicorn

app = FastAPI()

API_PREFIX = '/'

@app.websocket(f"{API_PREFIX}/raceiq/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    consumer = KafkaConsumer(
        'test',
        bootstrap_servers="localhost:9093",
    )
    for message in consumer:
        print("New message!")
        data = message.value
        try:
            data = json.loads(data.decode('utf-8'))
        except:
            pass

        await websocket.send_text(f"Message text was: {data}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)