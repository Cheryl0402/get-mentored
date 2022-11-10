const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let careerSchema = new Schema({
    onet_code: {
        type: String
    },
    occupation_title: {
        type: String
    },
}, {
    collection: 'career'
})
module.exports = mongoose.model('Career', careerSchema)