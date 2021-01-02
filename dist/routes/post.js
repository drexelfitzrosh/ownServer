"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = require("../enteties/Post");
const index_1 = require("../utils/index");
const router = express_1.default.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield index_1.ORM();
    const post = yield orm.em.find(Post_1.Post, {});
    return res.send(post);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = yield index_1.ORM();
        const id = parseInt(req.params.id);
        const post = yield orm.em.findOne(Post_1.Post, { id });
        if (post) {
            return res.send(post);
        }
        return res.status(402).json({ error: 'no post found' });
    }
    catch (error) {
        console.error(error);
        return res.status(402).json({ error: error });
    }
}));
exports.default = router;
//# sourceMappingURL=post.js.map