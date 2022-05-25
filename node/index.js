const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require("apollo-server-core");
const typeDefs = require("./typeDefs.gql");
const mysql = require("mysql");

var sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "051722Zero",
  database: "books",
});

sql.connect();
// 定义所有书籍列表
let booksList = [];

const resolvers = {
  Query: {
    // 查询所有书籍
    showAllBooks: () => {
      sql.query("select * from library", function (error, results, fields) {
        if (error) throw error;
        // console.log("The solution is: ", results);
        booksList = results.map((value) => {
          return value;
        });
        // return results;
      });
      return booksList;
    },
  },
  Mutation: {
    // 增加书籍
    addBooks: (_, args) => {
      const { input } = args;
      const arr = [input.name, input.numbering, input.sort, input.synopsis];
      const add = sql.query(
        "insert into library (name,numbering,sort, synopsis) values(?,?,?,?)",
        arr,
        function (error, results, fields) {
          if (error) throw error;
          //   console.log("The solution is: ", results, data, fields);
        }
      );
      console.log(add.sql);
    },
    //删除书籍
    removeBooks: (_, args) => {
      const { id } = args;
      const remove = sql.query(
        "delete from library where id=? ",
        id,
        function (error, results, fields) {
          if (error) throw error;
          //   console.log("The solution is: ", results, data, fields);
        }
      );
      console.log(remove.sql);
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
