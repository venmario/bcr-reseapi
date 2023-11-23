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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _AuthenticationController_checkPassword, _AuthenticationController_createToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
class AuthenticationController {
    constructor(pApp) {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_1.User.query().findOne({
                email: email,
            });
            if (!user) {
                return res.status(404).json({
                    message: "User not found!",
                });
            }
            if (!user.password) {
                return res.status(404).json({
                    message: "Wrong Password",
                });
            }
            const authenticatedUser = yield __classPrivateFieldGet(this, _AuthenticationController_checkPassword, "f").call(this, user.password, password);
            if (!authenticatedUser) {
                return res.status(404).json({
                    message: "Wrong Password",
                });
            }
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            };
            const token = __classPrivateFieldGet(this, _AuthenticationController_createToken, "f").call(this, payload);
            return res.json({
                token,
            });
        });
        _AuthenticationController_checkPassword.set(this, (encryptedPassword, plainPassword) => __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(plainPassword, encryptedPassword);
        }));
        _AuthenticationController_createToken.set(this, (payload) => {
            const secretKey = process.env.SECRET;
            const jam = 1;
            const expired = 3600 * jam;
            return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expired });
        });
        this.app = pApp;
    }
    init() {
        this.app.post("/login", this.login);
    }
}
exports.AuthenticationController = AuthenticationController;
_AuthenticationController_checkPassword = new WeakMap(), _AuthenticationController_createToken = new WeakMap();
