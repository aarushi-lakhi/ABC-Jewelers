"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Protected routes
router.get('/my-orders', auth_middleware_1.auth, order_controller_1.orderController.getUserOrders);
router.get('/:id', auth_middleware_1.auth, order_controller_1.orderController.getOrderById);
router.post('/', auth_middleware_1.auth, order_controller_1.orderController.createOrder);
router.post('/:id/cancel', auth_middleware_1.auth, order_controller_1.orderController.cancelOrder);
// Admin routes
router.get('/', auth_middleware_1.adminAuth, order_controller_1.orderController.getAllOrders);
router.put('/:id/status', auth_middleware_1.adminAuth, order_controller_1.orderController.updateOrderStatus);
exports.orderRoutes = router;
