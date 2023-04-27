import { Router } from "express";
import userRoute from "../routes/user.route";
import contactRoute from "../routes/contact.route";
import messages from "../customs/messages";
import mediaRoute from "./media.route";

const router = Router();

export type Route = {
  path: string;
  route: Router;
};

const routes: Route[] = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: '/media',
    route: mediaRoute,

  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

// Route to ensure that server is currently running
router.get('/', (req, res)=>{
  res.send({
    success: true,
    message: messages['welcomeMessage'], 
    data:[],
  })
})


export default router;
