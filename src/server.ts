import express from "express";
import PostRouter from "./Post/post.router";
import TagRouter from "./Tag/tag.router";

const app = express();
app.use(express.json());

app.use(PostRouter);
app.use(TagRouter);

const HOST = "localhost";
const PORT = 8001;

app.get("/", (_, res) => {
  res.json("Hello world");
});

app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})