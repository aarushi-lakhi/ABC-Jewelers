"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.get('/', product_controller_1.productController.getAllProducts);
router.get('/:id', product_controller_1.productController.getProductById);
// Protected routes
router.post('/:id/reviews', auth_middleware_1.auth, product_controller_1.productController.addReview);
// Admin routes
router.post('/', auth_middleware_1.adminAuth, product_controller_1.productController.createProduct);
router.put('/:id', auth_middleware_1.adminAuth, product_controller_1.productController.updateProduct);
router.delete('/:id', auth_middleware_1.adminAuth, product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
