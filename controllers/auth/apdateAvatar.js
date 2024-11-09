const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const apdateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.files[0];
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;
  const resultUpload = (pathUpload = path.join(avatarDir, filename));
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate({ _id }, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = apdateAvatar;
