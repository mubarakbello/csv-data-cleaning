const csv = require('fast-csv');
const fs = require('fs');

data_list = [];

input_path = 'input_data.csv'; // put the file_path here
output_path = 'output_csv.csv';

start_index = 10001; // change this
end_index = 20000;

const cleanData = (data = []) => {
  output_csv_array = [];
  // implement your logic here
  // and write the cleaned data to the output_csv_array

  // then, write the output array to a csv
  createOutput(output_csv_array);
}

const createOutput = (output_array = [[]]) => {
  const ws = fs.createWriteStream(output_path);
  csv.write(output_array).pipe(ws)
    .on('finish', () => {
      console.log('Done writing to csv');
    });
}

csv.fromPath(input_path, {headers: true})
  .on('data', row => {
    data_list.push([row['device_manufacturer'], row['device_model']]);
  })
  .on('end', () => {
    console.log('Done reading file');

    // now, call function to clean data
    cleanData(data_list.slice(start_index-1, end_index));
  });
