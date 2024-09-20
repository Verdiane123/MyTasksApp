import express from "express";
import cors from "cors";
import { connectToMongo } from "./db_utils.mjs";
import { ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("Hello world io");
});

app.get("/tasks", async (req, res) => {
  try {
    const collection = await connectToMongo();
    const tasks = await collection.find().toArray();
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

app.post("/create-task", async (req, res) => {
  try {
    const collection = await connectToMongo();
    console.log("Collection accédée :", collection.collectionName);

    const task = {
      name: req.body.name,
      description: req.body.description,
    };

    console.log("Tâche à insérer :", task);

    const result = await collection.insertOne(task);
    console.log("Résultat de l'insertion :", result);

    res
      .status(201)
      .json({ message: "Tâche enregistrée !", id: result.insertedId });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la tâche:", error);
    res.status(400).json({
      error: "Erreur lors de l'enregistrement de la tâche",
      details: error,
    });
  }
});

app.get("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const collection = await connectToMongo();
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Tâche non trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la tâche" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedData = req.body;
  try {
    const collection = await connectToMongo();
    const result = await collection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: updatedData }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Tâche mise à jour avec succès" });
    } else {
      res.status(404).json({ message: "Tâche non trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la tâche" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
