const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(express.json());
server.use(cors());

// Error handling middleware
server.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message });
});

// Middleware to catch errors in route handlers
server.use((req, res, next) => {
  try {
    // Execute the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
});

server.get("/accounts/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const accounts = router.db.get("accounts").value();
    const filterAccounts = accounts.filter(
      (account) => account.clientId === id
    );
    res.json(filterAccounts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.post("/accounts", (req, res) => {
  try {
    const account = req.body;
    const accounts = router.db.get("accounts").value();
    const lastAccount = accounts[accounts.length - 1];
    account.id = lastAccount?.id + 1 ? lastAccount.id + 1 : 101;
    router.db.get("accounts").push(account).write();

    res.json(account);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.put("/accounts", (req, res) => {
  try {
    const account = req.body;
    const id = account.id;
    router.db.get("accounts").find({ id }).assign(account).write();
    res.json(account);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/currencies", (req, res) => {
  try {
    const currencies = router.db.get("currencies").value();
    res.json(currencies);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/accountStatuses", (req, res) => {
  try {
    const accountStatuses = router.db.get("accountStatuses").value();
    res.json(accountStatuses);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/countries", (req, res) => {
  try {
    const countries = router.db.get("countries").value();
    res.json(countries);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/accountTypes", (req, res) => {
  try {
    const accountTypes = router.db.get("accountTypes").value();
    res.json(accountTypes);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/cities", (req, res) => {
  try {
    const cities = router.db.get("cities").value();
    res.json(cities);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/genders", (req, res) => {
  try {
    const genders = router.db.get("genders").value();
    res.json(genders);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("clients/:id", (req, res) => {
  try {
    const { id } = req.params;
    const client = router.db.get("clients").find({ id }).value();
    res.json(client);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.get("/clients", (req, res) => {
  try {
    const { pageIndex, pageSize, sortBy, sortDirection, query, ...filters } =
      req.query;
    let filteredClients = router.db.get("clients").value();
    if (query) {
      filteredClients = filteredClients.filter((client) => {
        return (
          client.name.toLowerCase().includes(query.toLowerCase()) ||
          client.surname.toLowerCase().includes(query.toLowerCase()) ||
          client.personalNumber.toLowerCase().includes(query.toLowerCase()) ||
          client.gender.toLowerCase() === query.toLowerCase() ||
          client.physicalAddress.address
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          client.legalAddress.address
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          client.legalAddress.country.toLowerCase() === query.toLowerCase() ||
          client.legalAddress.city.toLowerCase() === query.toLowerCase() ||
          client.physicalAddress.country.toLowerCase() ===
            query.toLowerCase() ||
          client.physicalAddress.city.toLowerCase() === query.toLowerCase()
        );
      });
    }

    if (sortBy && sortDirection) {
      filteredClients = filteredClients.sort((a, b) => {
        const sortOrder = sortDirection === "asc" ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortOrder : -1 * sortOrder;
      });
    }

    const skip = +pageIndex;
    const take = +pageSize;

    const arr = filteredClients.slice(skip);
    const paginatedClients = arr.slice(0, take);

    res.json({ data: paginatedClients, total: filteredClients.length });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.post("/clients", (req, res) => {
  try {
    const client = req.body;
    const clients = router.db.get("clients").value();
    client.id = clients.length + 1;
    router.db.get("clients").push(client).write();
    res.json(client);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.put("/clients", (req, res) => {
  try {
    const client = req.body;
    const id = client.id;
    router.db.get("clients").find({ id }).assign(client).write();
    res.json(client);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.delete("/clients", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    router.db.get("clients").remove({ id }).write();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

server.use(middlewares);
server.use(router);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
