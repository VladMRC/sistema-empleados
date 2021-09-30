import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();
    
    // middelwares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    
    //Routes
    app.use('/', routes);

    // start express server
    app.listen(PORT, () => console.log(`Server running on http://localhost:${ PORT }/`));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
