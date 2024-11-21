import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    },
});

router.get("/order", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurantOrders);
// GET /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)

// /api/my/resturant
router.post(
  "/",
  upload.single("imageFile"), //multer middleware, add file into object to the request. do all the requried stuff before validation
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestuarant
);

router.put(
  "/",
  upload.single("imageFile"), //multer middleware, add file into object to the request. do all the requried stuff before validation
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant//handler function
);

export default router;