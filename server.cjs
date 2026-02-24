const express = require("express");
const path = require("path");

const app = express();

const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// fallback SPA (Express 5)
app.get(/.*/, (_req, res) => {
 res.sendFile(path.join(distPath, "index.html"));
});

const port = Number(process.env.PORT || 3000);
app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend rodando na porta ${port}`);
});
