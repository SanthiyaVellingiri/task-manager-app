import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { ddb } from "../db/dynamodb.js";

const TABLE = process.env.TASKS_TABLE;

export const getTasks = async (req, res) => {
  const data = await ddb.send(new ScanCommand({ TableName: TABLE }));
  res.json(data.Items || []);
};

export const addTask = async (req, res) => {
  const task = {
    id: uuid(),
    title: req.body.title,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await ddb.send(new PutCommand({ TableName: TABLE, Item: task }));
  res.json(task);
};

export const toggleTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await ddb.send(new UpdateCommand({
    TableName: TABLE,
    Key: { id },
    UpdateExpression: "set #s = :s",
    ExpressionAttributeNames: { "#s": "status" },
    ExpressionAttributeValues: { ":s": status },
  }));

  res.json({ id, status });
};

export const deleteTask = async (req, res) => {
  await ddb.send(new DeleteCommand({
    TableName: TABLE,
    Key: { id: req.params.id },
  }));

  res.json({ success: true });
};
