const db = require("../index").db;

async function allProducts(req, res) {
  db.all("SELECT * FROM products", [], (err, data) => {
    if (err) {
      res.send(JSON.stringify({ response: "Something went wrong" }));
    }

    res.send(data);
  });
}

// async function singleProduct(req, res) {
//     const id = req.params.id;
//     db.get('SELECT * FROM products WHERE id=?', [id], (err, data) => {
//         res.send(data);
//     });
// }

// async function singleProduct (req, res) {
//     try {
//       const product = await Product.findByPk(req.params.id);
//       if (!product) {
//         return res.status(404).json({ msg: 'Product not found' });
//       }
//       res.json(product);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   };

function singleProduct({ params: { id } }, res) {
  db.get("SELECT * FROM products WHERE id=?", [id], (err, data) => {
    if (err) {
      res.send(JSON.stringify({ response: "Something went wrong" }));
    }
    res.send(data);
  });
}

async function createProduct(req, res) {
  db.run(
    "INSERT INTO products(image, name, price, description) VALUES(?,?,?,?)",
    [req.body.image, req.body.name, req.body.price, req.body.description],
    (err) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      res.send(JSON.stringify({ response: "Product Created" }));
    }
  );
}


async function updateProduct(req, res) {
  db.run(
    "UPDATE products SET image=?, name=?, price=?, description=? WHERE id=?",
    [
      req.body.image,
      req.body.name,
      req.body.price,
      req.body.description,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      res.send(JSON.stringify({ response: "Product Updated" }));
    }
  );
}

async function deleteProduct(req, res) {
  db.run("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) {
      res.send(JSON.stringify({ response: "Something went wrong" }));
    }
    res.send(JSON.stringify({ response: "Product Deleted" }));
  });
}

module.exports = {
  allProducts,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
