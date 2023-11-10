const express = require('express');
const sql = require('mssql');

const app = express();
const port = 1433;

// Configura la conexión a SQL Server
const config = {
  user: 'sa',
  password: 'database',
  server: 'ANGELYTHOMAS',
  database: 'PROYECTOSW',
};

// Ruta de ejemplo para obtener datos de SQL Server
app.get('/datos', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error('Error de conexión:', err);
      res.status(500).send('Error de conexión a la base de datos');
      return;
    }

  /*  const request = new sql.Request();
    request.query('SELECT * FROM tu_tabla', (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error al obtener datos de la base de datos');
      } else {
        res.json(result.recordset);
      }
      sql.close();
    });*/
  });
});

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en el puerto ${port}`);
});
