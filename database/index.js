const Pool = require('pg').Pool

const pool = new Pool({
  user: 'jimmyma',
  host: 'localhost',
  database: 'liftsdb',
})

pool.on('error', (err) => {
    console.log('An idle client has experienced an error', err.stack)
})

const getLiftsByLifterId = (request, response) => {
  const id = parseInt(request.params.id)


  pool.query('SELECT Lifter.Lifter_ID, Initial_squat,Initial_bench, Initial_deadlift, Initial_shoulder_press, Current_squat, Current_bench, Current_deadlift, Current_shoulder_press, Workout_date, Pounds,Reps, ORM FROM Lifter INNER JOIN Squat on Lifter.Lifter_ID = Squat.Lifter_ID WHERE Lifter.Lifter_ID = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results)
    response.status(200).json(results.rows)
  })
}


// const getLiftsByLifterId = (request, response) => {
//   const id = parseInt(request.params.id)


//   pool.query('SELECT * FROM Lifter WHERE Lifter.Lifter_ID = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     // console.log(results)
//     response.status(200).json(results.rows)
//   })
// }


const AddWorkout = (request, response) => {
// //   const { Check_in, Check_out } = request.body
//   const Listing_ID = request.body.Listing_ID;
//   const Check_in = request.body.Check_in;
//   const Check_out = request.body.Check_out;


//   pool.query('INSERT INTO Booking (Booked_ID, Check_in, Check_out, Listing_ID) VALUES (DEFAULT, $1, $2, $3)', [Check_in, Check_out, Listing_ID], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`Booking added with ID: ${results}`)
//   })
}

module.exports = {
    getLiftsByLifterId,
    AddWorkout
  }