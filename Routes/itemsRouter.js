import express, { Router } from "express";
import middleware from "../Middleware/middleware.js";
import { Item } from "../Database/Models/models.js";
import zod from "zod";

const router = Router();

const itembody = zod.object({
  location: zod.string(),
  description: zod.string(),
  date: zod.string().transform((str) => new Date(str)),
});

router.post("/lost-items", middleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID missing" });
  }

  try {
    const { success } = itembody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect input format",
      });
    }
    const { location, date, description } = req.body;
    const existingitem = await Item.findOne({
      userId,
      location,
      description,
      date,
      status: "lost",
    });
    if (existingitem) {
      return res.status(411).json({
        message: "This lost product has already been reported",
      });
    }

    const item = await Item.create({
      userId,
      location,
      description,
      date,
      status: "lost",
    });
    res.status(200).json({
      message: "Lost item has been reported",
    });
  } catch (error) {
    res.status(500).json({ error: "Lost item could not be reported!!" });
    console.log(error);
  }
});

router.post("/found-items", middleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID missing" });
  }

  try {
    const { success } = itembody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect input format",
      });
    }
    const { location, date, description } = req.body;
    const existingitem = await Item.findOne({
      userId,
      location,
      description,
      date,
      status: "found",
    });
    if (existingitem) {
      return res.status(411).json({
        message: "This product has already been reported and found",
      });
    }

    const item = await Item.create({
      userId,
      location,
      description,
      date,
      status: "found",
    });
    res.status(200).json({
      message: "Found item has been reported",
    });
  } catch (error) {
    res.status(500).json({ error: "Found item could not be reported!!" });
    console.log(error);
  }
});

router.get("/lost-items", async (req, res) => {
  try {
    const items = await Item.find({});
    const lostItems = items
      .filter((item) => item.status === "lost")
      .map((item) => ({
        id: item._id,
        userId: item.userId,
        location: item.location,
        date: item.date,
        description: item.description,
      }));

    res.json({
      LostItems: lostItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
    console.log(error);
  }
});
router.get("/found-items", async (req, res) => {
  try {
    const items = await Item.find({});
    const foundItems = items
      .filter((item) => item.status === "found")
      .map((item) => ({
        id: item._id,
        userId: item.userId,
        location: item.location,
        date: item.date,
        description: item.description,
      }));

    res.json({
      FoundItems: foundItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
    console.log(error);
  }
});

router.get("/match-items", async (req, res) => {
  try {
    const lostItems = await Item.find({ status: "lost" });
    const foundItems = await Item.find({ status: "found" });

    const matches = [];

    lostItems.forEach((lost) => {
      foundItems.forEach((found) => {
        if (
          lost.description.toLowerCase() === found.description.toLowerCase() &&
          lost.location.toLowerCase() === found.location.toLowerCase()
        ) {
          matches.push({ lostItem: lost, foundItem: found });
        }
      });
    });

    if (matches.length > 0) {
      res.status(200).json({ matches });
    } else {
      res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while matching items" });
  }
});

router.delete("/lost-items/:id", async (req, res) => {
  const itemid = req.params.id;
  try {
    const item = await Item.findOneAndDelete({ _id: itemid });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item" });
  }
});

router.delete("/found-items/:id", async (req, res) => {
  const itemid = req.params.id;
  try {
    const item = await Item.findOneAndDelete({ _id: itemid });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item" });
  }
});

router.get("/lost-items/history", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "User ID missing" });
  }

  try {
    // Directly filter by userId in MongoDB query
    const userItems = await Item.find({ userId: user_id });

    if (userItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No lost items found for this user." });
    }

    res.json({
      UserHistory: userItems.map((item) => ({
        id: item._id,
        userId: item.userId,
        location: item.location,
        date: item.date,
        description: item.description,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

router.get("/nearby-lost-items", async (req, res) => {
  const locationfilter = req.query.location || "";

  console.log("Location filter:", locationfilter);
  try {
    let items;

    if (locationfilter) {
      items = await Item.find({
        location: { $regex: locationfilter, $options: "i" },
      });
    } else {
      items = await Item.find({});
    }

    // If no items are found
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No nearby lost items found." });
    }

    res.json({
      NearbyItems: items.map((item) => ({
        id: item._id,
        userId: item.userId,
        location: item.location,
        date: item.date,
        description: item.description,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching nearby items." });
  }
});
router.patch("/lost-items/claim/:id", async (req, res) => {
  try {
    const itemid = req.params.id;
    const updateditem = await Item.findByIdAndUpdate(
      itemid,
      { status: "found" },
      { new: true }
    );
    if (!updateditem) {
      res.status(400).json({
        message: "Lost Item not found for the provided item id",
      });
    }
    res.json({
      message: "Item successfully claimed as found!",
      item: updateditem,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while claiming the item." });
  }
});
export default router;
