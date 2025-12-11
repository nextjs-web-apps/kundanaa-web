import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // We explicitly select: false to not return the password hash by default
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    // Hash the password with a salt round of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return next;
});

// Method to compare password (for sign-in logic)
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // Use the select: false field in a method
  const passwordHash = await (this as any)
    .model("User")
    .findOne({ _id: this._id })
    .select("+password")
    .exec();
  if (!passwordHash || !passwordHash.password) return false;
  return bcrypt.compare(candidatePassword, passwordHash.password);
};

const User: Model<IUser> =
  (mongoose.models?.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
