import {Schema, model, models} from 'mongoose'

const categorySchema = new Schema({
  name: {type: String, trim: true, required: true, maxLength: 32, unique: true},
  slug: {type: String, unique: true, lowercase: true}
}, {timestamps: true})

const Category = models.Category || new model("Category", categorySchema)

export default Category