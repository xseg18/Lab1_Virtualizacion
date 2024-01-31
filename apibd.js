const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuración de la conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'admin1',
  password: '1234',
  database: 'Usuario'
});

// Conectar a la base de datos MySQL
conexion.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos: ', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Definir una r/:iAPI para obtener datos de la base de datos
app.get('/create/:id/:nombre/:raza/:color', (req,res) => {
    const id = req.params.id;
    const nombre = req.params.nombre;
    const raza = req.params.raza;
    const color = req.params.color;
    const consulta = 'insert into Perros values(?, ?, ?, ?)';
    conexion.query(consulta, [id, nombre, raza, color], (error, resultados) => {
     if (error) {
       console.error('Error al ejecutar la consulta: ', error);
       return;
     }
     res.json(resultados);
  });
});

app.get('/read/:id', (req,res) => {
    conexion.query('select * from Perros where idPerro = ?',[req.params.id], (error, resultados) => {
     if (error) {
       console.error('Error al ejecutar la consulta: ', error);
       return;
     }
     res.json(resultados);
  });
});

app.get('/update/:id/:nombre/:raza/:color', (req,res) => {
    conexion.query('update Perros set Nombre = ?, Raza = ?, Color = ? where idPerro = ?', [req.params.id, req.params.nombre, req.params.raza, req.params.color], (error, resultados) => {
     if (error) {
       console.error('Error al ejecutar la consulta: ', error);
       return;
     }
     res.json(resultados);
  });
});

app.get('/delete/:id', (req,res) => {
    conexion.query('delete from Perros where idPerro = ?', [req.params.id], (error, resultados) => {
     if (error) {
       console.error('Error al ejecutar la consulta: ', error);
       return;
     }
     res.json(resultados);
  });
});
// Configurar el servidor para que escuche en un puerto específico
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor web escuchando en el puerto ${puerto}`);
});
