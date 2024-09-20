import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export async function connectToMongo() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db("MyTasks").collection("Tasks");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

export async function findAllTasks() {
  return connectToMongo("MyTasks", "Tasks").then((collection) => {
    return collection.find({}).toArray();
  });
}

function main() {
  connectToMongo(myTasks, Tasks)
    .then((collection) => {
      return findAllTasks(collection);
    })
    .then((tasks) => {
      console.log("Tâches trouvées :");
      console.log(tasks);
    })
    .catch((error) => {
      console.error("Une erreur est survenue :", error);
    });
}
