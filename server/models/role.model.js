import mongoose, { Schema} from "mongoose";
import AutoIncrement from "mongoose-sequence"


const autoIncrement = AutoIncrement(mongoose);

const roleSchema  = new Schema({
    id : {
        type : Number,
        // required : true,
    },
    name : {
        type : String,
        unique : true,
        required : true
    },
    status : {
        type : String,
    }
})


roleSchema.plugin(autoIncrement , {inc_field :  'id'})
export const Role = mongoose.model("Role" , roleSchema)