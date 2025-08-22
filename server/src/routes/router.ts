import { Router, Request, Response } from "express";
import { Product } from "../models/ProductModel";
import { List } from "../models/ListModel";
import { User } from "../models/UserModel";


export const router = Router();

// אנדפוינט לדוגמה
router.get("/", (req: Request, res: Response) => {
  res.send("API עובד!");
});



router.post("/seed", async (req, res) => {
console.log(258)
  try {
    // 1️⃣ מנקה את כל הטבלאות (לצורך seed נקי)
    await Product.deleteMany({});
    await List.deleteMany({});
    await User.deleteMany({});

    // 2️⃣ יוצרים משתמשים
    const user1 = await User.create({ userName: "Yaakov", password: "1234" });
    const user2 = await User.create({ userName: "Ben", password: "5678" });
    console.log(.000000)

    // 3️⃣ יוצרים רשימות
    const list1 = await List.create({
      listName: "קניות שבועיות",
      userIds: [user1._id] // רשימה פרטית
    });
console.log(11111)
    const list2 = await List.create({
      listName: "רשימת מסיבה",
      userIds: [user1._id, user2._id] // רשימה משותפת
    });

    // 4️⃣ יוצרים מוצרים
    await Product.create([
      { listId: list1._id, name: "חלב", quantity: 2 },
      { listId: list1._id, name: "לחם", quantity: 1 },
      { listId: list2._id, name: "עוגות", quantity: 5, imageUrl: "https://example.com/cake.png" },
      { listId: list2._id, name: "שוקולד", quantity: 10 }
    ]);
    console.log(2222)

    res.status(200).json({ message: "Seed finished successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
