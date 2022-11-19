db.createUser({
  user: "admin",
  pwd: "adminpassword",
  roles: [
    {
      role: "readWrite",
      db: "syncer",
    },
  ],
});

// mongosh -u <your username> -p <your password> --authenticationDatabase <your database name>
