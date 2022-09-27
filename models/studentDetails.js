import mongoose from 'mongoose';

const detailSchema = mongoose.Schema({
    name: String,
    clas: String,
    section: String,
    fees: String,
    attendence: String,
    rollNo: Number
});
// detailSchema.index({rollNo : 1}, {unique : true});
var StudentDetails = mongoose.model('StudentDetails', detailSchema);

export default StudentDetails;