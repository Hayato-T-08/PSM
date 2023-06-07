import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

const data = fs.readFileSync('PSMrawdata.csv');
const records = parse(data);
for (const record of records) {
    console.log(record);
}