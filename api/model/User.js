    import mongoose from "mongoose";
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
      email: { type: String,unique : true, required: true },
      password: {
        type: String,
        required: true,
      },
      username: { type: String, unique : true,required: true },
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      refreshToken: String,
      favoriteAsteroids: [
        {
          asteriodId: { type: Number, required: true,unique : true },
          asteriodName: String,
          asteriodInfo: String,
        },
      ]
    });

    export default mongoose.model("User", userSchema);
