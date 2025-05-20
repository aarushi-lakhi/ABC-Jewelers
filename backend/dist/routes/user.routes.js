"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.post('/register', user_controller_1.userController.register);
router.post('/login', user_controller_1.userController.login);
// Protected routes
router.get('/profile', auth_middleware_1.auth, user_controller_1.userController.getProfile);
router.put('/profile', auth_middleware_1.auth, user_controller_1.userController.updateProfile);
router.get('/wishlist', auth_middleware_1.auth, user_controller_1.userController.getWishlist);
router.post('/wishlist/:productId', auth_middleware_1.auth, user_controller_1.userController.toggleWishlist);
exports.userRoutes = router;
