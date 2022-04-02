import serverMiddleware from "../middleware/serverMiddleware";
import HealthRoutes from "../routes/HealthRoutes";
import PostsRoutes from "../routes/PostsRoutes";
import UserRoutes from "../routes/UserRoutes";

const routesFactory = (server) => {
    UserRoutes(server)
    HealthRoutes(server)
    PostsRoutes(server)
}

const applyMiddleware = (express, server) => {
    server.use(express.json())
    server.use('/v1/*', serverMiddleware)
}
export default async (express) => {
    const server = express()
    applyMiddleware(express, server)
    routesFactory(server)
    
    const port = process.env.PORT || 3000
    server.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}