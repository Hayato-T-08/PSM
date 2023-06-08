import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

class Point{
    private x:number;
    private y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

}

function isCross(a1:Point,a2:Point,b1:Point,b2:Point){

}

const data = fs.readFileSync('PSMrawdata.csv');
const records = parse(data);
var all_num=0;
for (const record of records) {
    console.log(record);
    all_num++;
}

all_num--;
console.log(all_num);
var graph: number[][] = new Array();
var tmp = 50;


for( var i=0;i<12;i++){
    graph[i]= new Array();
    for(var j=0;j<5;j++){
        if(j===0) graph[i][0] = tmp;
        else graph[i][j] = 0;
    }
    tmp+=50;
}




for(var i=0;i<12;i++){
    for(var j=1;j<=all_num;j++){
    if(records[j][1]<=graph[i][0]){
        graph[i][1]++;
    }

    if(records[j][2]>=graph[i][0]){
        graph[i][2]++;
    }

    if(records[j][3]<=graph[i][0]){
        graph[i][3]++;
    }

    if(records[j][4]>=graph[i][0]){
        graph[i][4]++;
        }
    }
}

for(var i=0;i<12;i++){
    for(var j=1;j<=4;j++){
        graph[i][j]/=all_num;
        graph[i][j]*=100;
        graph[i][j]=Number(graph[i][j].toFixed(1));
    }
}

for(const num of graph){
    console.log(num);
}


    