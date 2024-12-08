const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (email === "test@example.com" && password === "password") {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
};

exports.protectedRoute = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, SECRET_KEY);
        return res.status(200).json({ message: "Access granted" });
    } catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};