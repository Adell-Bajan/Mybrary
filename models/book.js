const mongoose = require('mongoose')
const path = require('path')  
const coverImageBasepath ='uploads/bookCovers'

const bookSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	publishData:{
		type: Date,
		required:true
	},
	pageCount:{
		type:Number,
		required:true
	},
	createAt:{
		type:Date,
		required:true,
		default:Date.now
	},
	coverImageName:{
		type:String,
		required:true
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		ref:'Author'
	}
})

bookSchema.virtual('coverImagePath').get(function(){
	if(this.coverImageName != null){
		return path.join('/',coverImageBasepath,this.coverImageName)
	}
})


module.exports = mongoose.model('Book',bookSchema)
module.exports.coverImageBasepath =coverImageBasepath