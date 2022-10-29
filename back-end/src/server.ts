import app from "./app";
import { port } from "./config/server.json";

try {
  app.listen(port, () => {
    console.log(`API Server running on localhost:${port}`);
  });
} catch (error: any) {
  console.error(`Error ocurred: ${error.message}`);
}
