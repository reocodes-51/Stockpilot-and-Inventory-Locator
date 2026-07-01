const Product = require("../models/Product");
const groq = require("../config/groq");

const chatWithWarehouse = async (req, res) => {
  try {
    const { message } = req.body;

    const products = await Product.find();

    const inventory = products
      .map(
        (p) => `
Product ID: ${p.productId}
Name: ${p.name}
Quantity: ${p.quantity}
Price: ₹${p.price}
Shelf: ${p.shelf}
`
      )
      .join("\n");

    const prompt = `
You are an AI Warehouse Assistant.

You can answer ONLY questions related to this warehouse.

Warehouse Inventory:

${inventory}

User Question:

${message}

Rules:

- Give short answers.
- Mention shelf whenever possible.
- Mention quantity.
- Mention price if relevant.
- If the answer isn't in the inventory, politely say:
"I couldn't find that information in the warehouse database."
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert warehouse assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatWithWarehouse,
};