// routes/promptRoutes.js
const express = require("express");
const router = express.Router();
const Prompt = require("../models/promptModal");

// 1. Create a new prompt
router.post("/add", async (req, res) => {
  const { name, description } = req.body;

  console.log(req.body)

  try {
    const newPrompt = new Prompt({ name, description });
    await newPrompt.save();
    res
      .status(201)
      .json({ message: "Prompt created successfully", data: newPrompt });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating prompt", error: err.message });
  }
});

// 2. Get all prompts
router.get("/get", async (req, res) => {
  try {
    console.log("come")
    const prompts = await Prompt.find();
    res.status(200).json({ data: prompts });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching prompts", error: err.message });
  }
});

// 3. Get a prompt by ID
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    res.status(200).json({ data: prompt });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching prompt", error: err.message });
  }
});

// 4. Update a prompt by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    res
      .status(200)
      .json({ message: "Prompt updated successfully", data: updatedPrompt });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating prompt", error: err.message });
  }
});

// 5. Delete a prompt by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
console.log(id)
  try {
    const deletedPrompt = await Prompt.findByIdAndDelete(id);
    if (!deletedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting prompt", error: err.message });
  }
});

module.exports = router;
