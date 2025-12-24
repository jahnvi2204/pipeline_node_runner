from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def is_dag_from_edges(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # collect all node ids that appear either as explicit nodes or in edges
    node_ids = {node.get("id") for node in nodes if node.get("id") is not None}
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source is not None:
            node_ids.add(source)
        if target is not None:
            node_ids.add(target)

    # build adjacency and indegree for Kahn's algorithm
    adj = {nid: [] for nid in node_ids}
    indegree = {nid: 0 for nid in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in adj and target in adj:
            adj[source].append(target)
            indegree[target] += 1

    # Kahn's algorithm
    queue = [nid for nid, deg in indegree.items() if deg == 0]
    processed_count = 0

    while queue:
        current = queue.pop(0)
        processed_count += 1
        for neighbor in adj[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    # if we processed all nodes, there was no cycle
    return processed_count == len(node_ids)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes or []
    edges = pipeline.edges or []

    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = is_dag_from_edges(nodes, edges)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

