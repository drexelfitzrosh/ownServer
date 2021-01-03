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
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const post_1 = __importDefault(require("./routes/post"));
const user_1 = __importDefault(require("./routes/user"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield utils_1.ORM();
    yield orm.getMigrator().up();
    const app = express_1.default();
    app.use(body_parser_1.default.json({
        limit: '50mb',
        verify(req, _, buf) {
            req.rawBody = buf;
        }
    }));
    app.use('/post', post_1.default);
    app.use('/auth', user_1.default);
    app.get('/', (_, res) => {
        res.send('hello world');
    });
    app.listen(4000, () => console.log('server listening to port: 4000'));
});
main();
//# sourceMappingURL=index.js.map