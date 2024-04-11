

const { MongoClient, ObjectId, Binary } = require('mongodb');
const uri = 'mongodb+srv://sankeert:sankeert@cluster0.x4ixmg0.mongodb.net';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Mongoose connected');
    console.log('Connected to MongoDB');

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Mongo client connected');
  console.log('Connected to MongoDB');
  client.close();
});

const Schema = mongoose.Schema;
const admin = new Schema({
  name: String,
  id: Number
});

const Admins = mongoose.model('Admins', admin, 'Admins');
const Doctors = mongoose.model('Doctors', admin, 'Doctors');
const Patients = mongoose.model('Patients', admin, 'Patients');
const Specializations =mongoose.model('Specializations', admin, 'Specializations');
const Hospitals = mongoose.model('Hospitals', admin, 'Hospitals');
const Schedules =mongoose.model('Schedules', admin, 'Schedules');
const Appointments =mongoose.model('Appointments', admin, 'Appointments');
const Prescriptions =mongoose.model('Prescriptions', admin, 'Prescriptions');

app.get('/api/login', async (req, res) => {
  const queryParam = req.query.emailid;
  const promises = [Admins.find({ email: queryParam }), Patients.find({ email: queryParam }), Doctors.find({ email: queryParam })]
  const [result1, result2, result3] = await Promise.all(promises);
  if (result1.length > 0) {
    let data = {
      details: result1,
      isAdmin: true
    }
    return res.json(data);
  }
  else if (result2.length > 0) {
    let data = {
      details: result2,
      isPatient: true
    }
    return res.json(data);
  }

  else if (result3.length > 0) {
    let data = {
      details: result3,
      isDoctor: true
    }
    return res.json(data);
  }
  else {
    return res.json([]);
  }
})

app.get('/api/get/specializations', async (req, res) => {
  Specializations.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/add/specialization', (req, res) => {
  const collection = client.db('BookMyDoc').collection('Specializations');
  collection.insertOne(req.body.details)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.delete('/api/remove/specialization', (req, res) => {
  const Id = req.query.id;
  Specializations.deleteOne({ _id: Id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/update/specialization', async (req, res) => {
  const collection = client.db('BookMyDoc').collection('Specializations');
  const id = req.body.details._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
      "name": req.body.details.name,
      "description":  req.body.details.description,
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})

app.get('/api/get/hospitals', async (req, res) => {
  Hospitals.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/add/hospital', (req, res) => {
  const collection = client.db('BookMyDoc').collection('Hospitals');
  collection.insertOne(req.body.details)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.delete('/api/remove/hospital', (req, res) => {
  const Id = req.query.id;
  Hospitals.deleteOne({ _id: Id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/update/hospital', async (req, res) => {
  const collection = client.db('BookMyDoc').collection('Hospitals');
  const id = req.body._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
      "name": req.body.name,
      "address":  req.body.address,
      "type":  req.body.type,
      "phone":  req.body.phone,
      "email":  req.body.email
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})


app.post('/api/add/doctor', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Doctors');
  collection.insertOne(req.body.details)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.get('/api/get/doctors', async (req, res) => {
  Doctors.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/update/doctor', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Doctors');
  const id = req.body._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
     "isApproved" : req.body.isApproved
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})


app.post('/api/add/patient', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Patients');
  collection.insertOne(req.body.details)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.get('/api/get/schedules', async (req, res) => {
  const email = req.query.email;
  Schedules.find({doctorEmail: email})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/add/schedule', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Schedules');
  collection.insertOne(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})



app.post('/api/update/schedule', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Schedules');
  const id = req.body._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
      dayOfWeek: req.body.dayOfWeek,
      startTime:  req.body.startTime,
      endTime:  req.body.endTime,
      isAvailable: true
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})

app.delete('/api/remove/schedule', (req, res) => {
  const Id = req.query.id;
  Schedules.deleteOne({ _id: Id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.get('/api/get/doctorsBySpecialization', async (req, res) => {
  const specialization = req.query.name
  Doctors.find({specialization: specialization})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})


app.get('/api/get/schedulesByDate', async (req, res) => {
  const day = req.query.day;
  const id = req.query.doctorId;
  Schedules.find({dayOfWeek: day , doctorId: id})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})


app.post('/api/add/appointment', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Appointments');
  collection.insertOne(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.post('/api/add/payment', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Payments');
  collection.insertOne(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.get('/api/get/appointments', async (req, res) => {
  const id = req.query.id;
  var filter = id == "null" ?  {} : (req.query.isDoctor == "true" ? {doctorId: id} : {patientId:id});

  Appointments.find(filter)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

app.post('/api/update/appointmentStatus', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Appointments');
  const id = req.body._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
     "status" : req.body.status,
     "amountInDollars": req.body.amountInDollars ? req.body.amountInDollars : null
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})
app.post('/api/update/appointmentPaymentStatus', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Appointments');
  const id = req.query.id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
     "isPaymentMade": true
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})

app.post('/api/update/appointmentSchedule', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Appointments');
  const id = req.body._id;
  const filter = { _id: new ObjectId(id) };
  update = {
    $set: {
     "appointmentDate" : req.body.date,
     "timeSlot": req.body.timeSlot,
     "status": req.body.status
    }
  }
  collection.updateOne(filter, update).then((data) => {
    res.json(data);
  })
})

app.post('/api/add/prescription', (req, res) =>{
  const collection = client.db('BookMyDoc').collection('Prescriptions');
  collection.insertMany(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})

app.get('/api/get/prescription', (req, res) =>{
  const id = req.query.id
  Prescriptions.find({"appointment._id" :id})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})


app.get('/api/get/appointmentsForSlotCheck', (req, res) =>{
  const query = {
    $or: [
      { patientId: req.query.patientId },
      { doctorId: req.query.doctorId }
    ]
  };
  Appointments.find(query)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error adding data from MongoDB:', error);
      res.status(500).json({ error: 'Error adding data from MongoDB' });
    });
})


app.get('/api/get/patientDetails', async (req, res) => {
  const id = req.query.id
  Patients.find({email:id})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    });
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});