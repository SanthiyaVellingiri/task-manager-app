import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fakeAccessKeyId",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fakeSecretAccessKey",
  },
});

const createTable = async () => {
  const params = {
    TableName: "tasks",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }
    ],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    await client.send(new CreateTableCommand(params));
    console.log("✅ Tasks table created successfully!");
  } catch (error) {
    if (error.name === "ResourceInUseException") {
      console.log("⚠️  Table already exists");
    } else {
      console.error("❌ Error creating table:", error);
    }
  }
};

createTable();
