const { default: mongoose } = require("mongoose");

const verifyTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  verifyToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

const VerifyTokenModal = mongoose.model(
  "VerifyToken",
  verifyTokenSchema,
  "VerifyTokens"
);

module.exports = VerifyTokenModal;
