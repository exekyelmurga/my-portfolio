import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './routes/users.cjs'

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
// app.get('/users', getUsers);


app.use(express.json());
app.use('/', router)

//MongoDB connection

mongoose.connect('mongodb+srv://exekyelmurgapereyra:murgapereyra1@users.t2bfyfn.mongodb.net/?retryWrites=true&w=majority&appName=users')
.then(() => console.log('Mongo Atlas connection sucess'))
.catch((error) => console.error(error))

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
