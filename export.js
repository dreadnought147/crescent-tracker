const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function exportIssuesToCSV (db, res){
    db.all(`SELECT * FROM issues`, [], (err,issues)=>{
        if (err) {
  console.error('Error fetching issues for export:', err.message);
      res.status(500).send('Server error');        }
      else{
        const csvWriter = createCsvWriter
        ({
            path: './public/issues_export.csv',
            header: [
            {id: 'id', title: 'ID'},
            {id:'room_number', title: 'Room Number'},
            { id: 'name', title: 'Name' },
          { id: 'category', title: 'Category' },
          { id: 'urgency', title: 'Urgency' },
          { id: 'description', title: 'Description' },
          { id: 'status', title: 'Status' },
          { id: 'timestamp', title: 'Timestamp' }
            ]
        });

 if (issues.length>0)
  {
  csvWriter.writeRecords(issues)
        .then(() => {
          res.download('./public/issues_export.csv');
        })
        .catch((err) => {
          console.error('Error writing CSV:', err.message);
          res.status(500).send('Server error');
        });
    }
    else{
        res.status(404).send('No issues to export');
    }
      }

    });
}

module.exports = {exportIssuesToCSV}