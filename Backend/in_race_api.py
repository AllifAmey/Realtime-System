from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from websockets.exceptions import ConnectionClosed
from starlette.websockets import WebSocketState
from kafka import KafkaConsumer
from typing import Union
import json
import time
import asyncio
import uvicorn

app = FastAPI()



@app.websocket("/ws/{race_id}")
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, race_id: Union[str, None] = None):
    await websocket.accept()
    consumer = KafkaConsumer(
        'runner_sectionals',
        bootstrap_servers="localhost:9093",
        auto_offset_reset='latest'
    )
    #  uvicorn in_race_api:app --reload
    count = 0
    for message in consumer:
        try:
            print(message)
            count += 1
            print(f"New message {count}!")
            data = message.value
            data = json.loads(data.decode('utf-8'))
            if race_id is not None:
                if race_id.encode('utf-8') == message.key:
                    await asyncio.sleep(0.1)
                    await websocket.send_text(str(data))
            else:
                await asyncio.sleep(0.1)
                await websocket.send_text(str(data))
        except (WebSocketDisconnect, ConnectionClosed):
            break


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)