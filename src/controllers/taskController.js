require("dotenv").config();
const pool = require("../utils/mysql2");

// exports.getAllTasks = async (req, res) => {
//   const username = req.params.username;
//   const name1 = username.slice(0, 1);

//   pool.query("SELECT * FROM Tasks ORDER BY TaskID DESC", (err, rows) => {
//     if (!err && rows.length > 0) {
//       console.log(rows);
//       return res.render("tasks", {
//         user: username,
//         username: username,
//         Title: "Tasks Page",
//         tasks: rows,
//         name1: name1,
//       });
//     } else {
//       return console.log(err);
//     }
//   });
// };

exports.postCreateTask = (req, res) => {
  const { title, detail, username } = req.body;
  const now = new Date();
  const date = now.toLocaleString();

  console.log("username: " + username);

  pool.query(
    "INSERT INTO Tasks SET ?",
    {
      title: title,
      detail: detail,
      username: username,
      date: date,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect("/tasks/all");
      }
    }
  );
};

exports.getEditTask = (req, res) => {
  console.log("pressed edit");
};

exports.deleteTask = (req, res) => {
  console.log("pressed delete");
};
