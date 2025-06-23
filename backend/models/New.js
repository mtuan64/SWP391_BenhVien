const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: [
      {
        type: {
          type: String,
          enum: ["paragraph", "header", "image"],
          required: true,
        },
        text: {
          type: String,
          required: function () {
            return this.type !== "image";
          },
        },
        bold: {
          type: Boolean,
          default: false,
        },
        italic: {
          type: Boolean,
          default: false,
        },
        fontSize: {
          type: String,
          enum: ["small", "medium", "large"],
          default: "medium",
        },
        url: {
          type: String,
          required: function () {
            return this.type === "image";
          },
        },
      },
    ],
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;