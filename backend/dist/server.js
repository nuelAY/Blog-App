"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
// 🖼 Serve uploaded images/files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// 🌐 Serve static frontend
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/out')));
// 🔁 Fallback: send index.html for any other route
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/out/index.html'));
});
app.get('/', (_req, res) => {
    res.send('Blog API is running');
});
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
