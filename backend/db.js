const mongoose = require('mongoose')
//const mongoURI = 'mongodb+srv://ronak_3752:ronak@cluster0.4ewpqoa.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoURI = 'mongodb://127.0.0.1:27017/gofoodmern'

const mongoDB = async () => {
  try {
    const connect=await mongoose.connect(mongoURI)
    if(connect)
    {
      console.log('Connected to MongoDB')
    }
    else 
    {
      console.log('Not Connected to MongoDB')
    }

    const foodItemCollection = mongoose.connection.db.collection('food_item')
    const foodCategoryCollection =
      mongoose.connection.db.collection('food_category')

      
      
      

    const foodItemData = await foodItemCollection.find({}).toArray()
    //console.log('Food Item Data:', foodItemData);


    const foodCategoryData = await foodCategoryCollection.find({}).toArray()
    //console.log('Food Category Data:', foodCategoryData);

    global.food_item = foodItemData
    global.foodCategory = foodCategoryData
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
  // finally {
  //   // Close the MongoDB connection after fetching data
  //   await mongoose.connection.close()
  //   console.log('Connection closed.')
  // }
}

module.exports = mongoDB

// const mongoose = require('mongoose')

// const user = require('./models/User')
// const mongoURI = 'mongodb://127.0.0.1:27017/gofoodmern'
// //   'mongodb+srv://ronak_3752:ronak@cluster0.4ewpqoa.mongodb.net/gofoodmern?retryWrites=true&w=majority'

// const mongoDB = async () => {

//   mongoose
//     .connect(mongoURI)
//     .then(() => {
//       console.log('Connected to MongoDB')
//       const fetched_data = mongoose.connection.db.collection('food_items')
//      // console.log(fetched_data)
//       fetched_data.find({}).toArray(function (err, data) {

//         console.log('helo')
//         if (err) {
//           console.error(err)
//         } else {
//           console.log(data)
//         }
//       })
//       console.log('helo')

//     })
//     .catch((err) => {
//       console.error('Error connecting to MongoDB:', err)
//     })
// }

// get data :

// const getdata = async (req, res) => {
//   console.log('entered here')
//   const aa = await food_items.find({})
//   console.log(aa)
// }
// getdata()

//module.exports = mongoDB

// const mongoose = require('mongoose')
// const mongoURI = 'mongodb://127.0.0.1:27017/gofoodmern'
// // 'mongodb+srv://ronak_3752:ronak@cluster0.4ewpqoa.mongodb.net/gofoodmern?retryWrites=true&w=majority'

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI)
//     console.log('Connected to MongoDB')

//     const fetched_data = await mongoose.connection.db.collection('food_item')
//     // const data = await fetched_data.find({}).toArray()

//     fetched_data.find({}).toArray(async function (err, data) {
//       const foodCategory = await mongoose.connection.db.collection(
//         'food_category'
//       )

//       foodCategory.find({}).toArray(function (err, catData) {
//         if (err) {
//           console.log(err)
//         } else {
//           global.food_item = data
//           global.foodCategory = catData
//         }
//       })
//     })
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err)
//   }
//   // finally {
//   //   // Close the MongoDB connection after fetching data
//   //   await mongoose.connection.close()
//   //   console.log('Connection closed.')
//   // }
// }

// module.exports = mongoDB
