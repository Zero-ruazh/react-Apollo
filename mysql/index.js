const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs.gql");
const mysql = require("mysql2/promise");
require("dotenv").config();
(async () => {
  var sql = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.PGUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  sql.connect();

  const resolvers = {
    Query: {
      // 查询所有书籍
      showAllBooks: async () => {
        try {
          const [rows] = await sql.execute("select * from library");
          return rows;
        } catch (error) {
          throw error;
        }
      },
    },
    Mutation: {
      // 增加书籍
      addBooks: async (_, args) => {
        try {
          const { input } = args;
          const arrBook = [
            input.name,
            input.numbering,
            input.sort,
            input.synopsis,
          ];
          const [rows] = await sql.execute(
            "insert into library (name,numbering,sort, synopsis) values(?,?,?,?) ",
            arrBook
          );
          const { insertId } = rows;
          return {
            code: 200,
            message: "Success",
            data: { ...input, id: insertId },
          };
        } catch (error) {
          throw error;
        }
      },
      //删除书籍
      removeBooks: async (_, args) => {
        try {
          const { id } = args;
          const [rows] = await sql.execute("delete from library where id=? ", [
            id,
          ]);
          return {
            id,
            code: 200,
            message: "Success",
          };
        } catch (error) {
          throw error;
        }
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
