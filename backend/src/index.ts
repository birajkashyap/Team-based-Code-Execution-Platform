import express, {
  type Request,
  type Response,
  type Application,
} from "express";

const app: Application = express();

const port = process.env.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json("Running fine");
});

app.listen(port, () => {
  console.log(`Server runnign on port ${port}`);
});
